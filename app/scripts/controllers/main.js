'use strict';

analyseApp.controller('MainCtrl', ['$scope', 'userPrefs','$filter',function($scope, userPrefs, $filter) {
  $scope.lines = ['Sep 30 23:17:01 stephen-ThinkPad-T520 CRON[13174]: pam_unix(cron:session): session closed for user root'];
  $scope.data = [];
  $scope.loading = true;
  $scope.linesPageStart = 0;

  var inTags = $filter('inTags');

  $scope.p = userPrefs.get();
  if ($scope.p == null){
    $scope.p = {"subsetStart":"0","subsetCount":"1000","dateSearch":"\\w+\\s+\\d+\\s+\\d+:\\d+","dateFormat":"MMM +d +HH:mm","groupBy":1,"tags":[""]};
  }

  $scope.$watch('p', function() {
    userPrefs.put($scope.p);
  }, true);

  $scope.$watch('p', function() {
    $scope.drawChart();
  }, true);

  $scope.$watch('lines', function() {
    $scope.drawChart();
  });

  $scope.minusTag = function() {
    if ($scope.p.tags.length > 1){
      $scope.p.tags.pop();
    }
  }
  
  $scope.getDate = function(line) {
    try {
    	var dateString = line.match(new RegExp($scope.p.dateSearch, "i"))[0];
    	return Date.parseExact(dateString, $scope.p.dateFormat);
    } catch(e){
      console.log('return null');
      return null;
    }
  }

  function subset(line) {
    return line.slice(parseInt($scope.p.subsetStart), parseInt($scope.p.subsetStart)+parseInt($scope.p.subsetCount));
  }

  $scope.drawChart = function(){
    var lines = inTags($scope.lines, $scope.p.tags);

    $scope.data =  $.map($scope.p.tags, function(tag){
      var tlines = _.filter(lines, function(line){ return (line.indexOf(tag) != -1); });

      var data = $.map(tlines, function(line){
        return {date:$scope.getDate(line),count:0};
      });


      data = _.filter(data, function(d){return d.date != null});

      if ($scope.p.groupBy === 0) {
        console.warn('groupBy is 0, divide by 0 is undefined');
      }

      data = _.groupBy(data, function(o){
        return Math.floor(o.date.getTime() / $scope.p.groupBy);
      });

      data = _.toArray(data);

      data = $.map(data, function(a){
        return [[a[0].date.getTime(), a.length]];
      });
      
      data = _.sortBy(data, function(d){return d[0]});

      return [data];
    });
  }
}]);