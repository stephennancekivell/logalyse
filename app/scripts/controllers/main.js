'use strict';

analyseApp.controller('MainCtrl', ['$scope', 'userPrefs','$filter', '$location',function($scope, userPrefs, $filter, $location) {
  $scope.loading = true;
  $scope.linesPageStart = 0;
  $scope.paginationStart=0;
  $scope.paginationSize=10;
  $scope.pause = false;
  
  if (typeof analyseApp.file == 'undefined'){
    $location.url('/load');
  }

  $scope.lines = analyseApp.file;

  var inTags = $filter('inTags');

  $scope.p = userPrefs.get();
  if ($scope.p == null){
    $scope.p = analyseApp.defaultP;
  }

  $scope.$watch('p', function() {
    userPrefs.put($scope.p);
  }, true);


  $scope.$watch('[p, lines, pause]', function() {
    if ($scope.pause === false){
      $scope.buildChart();
    }
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
  
  $scope.buildChart = function(){
    var tags = _.filter($scope.p.tags, function(tag){
      if (typeof tag.plot != 'undefined'){
        return tag.plot;
      } else {
        return true;
      }
    });

    tags = _.map(tags, function(tag){
      tag.clickable = true;
      tag.data = [];
      return tag;
    });

    var tagLookup = {};
    _.each(tags, function(tag){
      tagLookup[tag.label] = tag;
    });

    for (var i=0; i< analyseApp.file.length; i++){
      var line = analyseApp.file[i];
      var lineDate = $scope.getDate(line);

      angular.forEach(tags, function(tag){
        if (line.indexOf(tag.label) != -1){
          tagLookup[tag.label].data.push({date:lineDate});
        }
      });
    }

    angular.forEach(tags, function(tag){
      var groupedPoints = _.groupBy(tag.data, function(point){
        return point.date;
      });
      tag.data = $.map(groupedPoints, function(point){
        if (point.length >0 && point[0].date != null){
          return {0: point[0].date.getTime(), 1: point.length};
        } else return {};
      });
    });

    $scope.data = tags;
  }

  $scope.$on('plotclick',function(e, point){
    // set paginationStart to the index of the line of the point that was clicked on.
    var tdate = point.datapoint[0];
    var tag = point.label;
    var found = false;

    for (var i=0; i< analyseApp.file.length; i++){
      var line = analyseApp.file[i];
      var lineDate = $scope.getDate(line);
      if (tdate === lineDate.getTime() && line.indexOf(tag) != -1){
        $scope.paginationStart = i;
        $scope.$apply();
        found = true;
        break;
      }
    }

    if (found === false){
      console.log('couldnt find the point you clicked on');
    }
  });

  $scope.back = function(){
    $location.url('/config');
  }

  $scope.pageForward = function(){
    $scope.paginationStart += $scope.paginationSize;
  }
  $scope.pageBack = function(){
    $scope.paginationStart -= $scope.paginationSize;
  }
}]);