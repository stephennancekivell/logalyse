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
      $scope.drawChart();
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

    var lines = _.filter(subset(analyseApp.file), function(line){
      var isTag = $.map(tags, function(tag){
        return (line.indexOf(tag.value) != -1);
      });
      return _.reduce(isTag, function(a,b){
        return (a | b);
      }, false);
    });

    $scope.data =  $.map(tags, function(tag){
      var tlines = _.filter(lines, function(line){ return (line.indexOf(tag.value) != -1); });

      var date = $.map(tlines, function(line){
        return {date:$scope.getDate(line),count:0};
      });


      date = _.filter(date, function(d){return d.date != null});

      date = _.groupBy(date, function(o){
        return Math.floor(o.date.getTime());
      });

      date = _.toArray(date);

      date = $.map(date, function(a){
        return [[a[0].date.getTime(), a.length]];
      });
      
      date = _.sortBy(date, function(d){return d[0]});

      return {data:date, label:tag.value, clickable:true};
    });

    $scope.buildChart = function(){
      var tags = _.filter($scope.p.tags, function(tag){
        if (typeof tag.plot != 'undefined'){
          return tag.plot;
        } else {
          return true;
        }
      });

      var tagData = {};
      _.each(tags, function(tag){
          tagData[tag.value] = [];
        });

      for (var i=0; i< analyseApp.file.length-1; i++){
        var line = analyseApp.file[i];
        var lineDate = $scope.getDate(line);

        angular.forEach(tags, function(tag){
          if (line.indexOf(tag.value) != -1){
            tagData[tag.value].push({date:lineDate, lineNumber:i});
          }
        });
      }

      angular.forEach(tagData, function(v,k){
        var date = v[0].date
        var groupedPoints = _.groupBy(v, function(point){
          return point.date;
        });
        console.log(groupedPoints);
        tagData[k] =  $.map(groupedPoints, function(point){
          return {
            lineNumber: point[0].lineNumber,
            date: point[0].date,
            count: point.length
          }
        });
      });

      $scope.data = $.map(tagData, function(a,b){
        console.log(a,b);
      });

    }

    $scope.$on('plotclick',function(e){
      console.log(arguments);
    });

    $scope.back = function(){
      $location.url('/config');
    }
  }
}]);