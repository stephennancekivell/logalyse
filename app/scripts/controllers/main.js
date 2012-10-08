'use strict';

analyseApp.controller('MainCtrl', ['$scope', 'userPrefs','$filter',function($scope, userPrefs, $filter) {
  $scope.lines = ['Sep 30 23:17:01 stephen-ThinkPad-T520 CRON[13174]: pam_unix(cron:session): session closed for user root'];
  $scope.data = [];
  $scope.loading = true;
  $scope.linesPageStart = 0;
  $scope.paginationStart=0;
  $scope.paginationSize=10;

  var inTags = $filter('inTags');

  $scope.p = userPrefs.get();
  if ($scope.p == null){
    $scope.p = {"subsetStart":"0","subsetCount":"1000","dateSearch":"\\w+\\s+\\d+\\s+\\d+:\\d+","dateFormat":"MMM +d +HH:mm","tags":[{values:""}]};
  }

  $scope.$watch('p', function() {
    userPrefs.put($scope.p);
  }, true);


  $scope.$watch('[p, lines]', function() {
    $scope.drawChart();
  },true);
  
  $scope.getDate = function(line) {
    try {
    	var dateString = line.match(new RegExp($scope.p.dateSearch, "i"))[0];
    	return Date.parseExact(dateString, $scope.p.dateFormat);
    } catch(e){
      console.log('error parsing date');
      return null;
    }
  }

  function subset(lines) {
    return lines.slice(parseInt($scope.p.subsetStart), parseInt($scope.p.subsetStart)+parseInt($scope.p.subsetCount));
  }

  $scope.drawChart = function(){
    var tags = _.filter($scope.p.tags, function(tag){
      if (typeof tag.plot != 'undefined'){
        return tag.plot;
      } else {
        return true;
      }
    });

    var lines = _.filter(subset($scope.lines), function(line){
      var isTag = $.map(tags, function(tag){
        return (line.indexOf(tag.value) != -1);
      });
      return _.reduce(isTag, function(a,b){
        return (a | b);
      }, false);
    });

    $scope.data =  $.map(tags, function(tag){
      var tlines = _.filter(lines, function(line){ return (line.indexOf(tag.value) != -1); });

      var data = $.map(tlines, function(line){
        return {date:$scope.getDate(line),count:0};
      });


      data = _.filter(data, function(d){return d.date != null});

      data = _.groupBy(data, function(o){
        return Math.floor(o.date.getTime());
      });

      data = _.toArray(data);

      data = $.map(data, function(a){
        return [[a[0].date.getTime(), a.length]];
      });
      
      data = _.sortBy(data, function(d){return d[0]});

      return {data:data, label:tag.value, clickable:true};
    });

    $scope.$on('plotclick',function(e){
      console.log(arguments);
    });
  }
}]);