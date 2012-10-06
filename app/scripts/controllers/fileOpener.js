'use strict';

analyseApp.controller('FileOpenerCtrl', function($scope, userPrefs) {
  $scope.lines = ['Sep 30 23:17:01 stephen-ThinkPad-T520 CRON[13174]: pam_unix(cron:session): session closed for user root'];
  $scope.data = [];
  $scope.loading = true;
  $scope.linesPageStart = 0;

  $scope.p = userPrefs.get();

  $scope.$watch('p', function(){
    userPrefs.put($scope.p);
  },true);

  $scope.$watch('p', function(){
    $scope.drawChart();
  }, true);

  $scope.$watch('lines', function(){
    $scope.drawChart();
  });
  
	function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    var reader = new FileReader();

    reader.onload = function(e){
    	$scope.lines = e.target.result.split('\n');
    	$scope.$digest();
    }

    reader.readAsText(files[0]);
  }
  document.getElementById('files').addEventListener('change', handleFileSelect, false);

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
    var lines = _.filter($scope.lines, function(line){return line.indexOf($scope.p.query) != -1;});
    $scope.data = $.map(subset(lines), function(line){
  		return {date:$scope.getDate(line),count:0};
  	});

    $scope.data = _.filter($scope.data, function(d){return d.date != null});

    $scope.data = _.groupBy($scope.data, function(o){
      return Math.floor(o.date.getTime() / $scope.p.groupBy);
    });

    $scope.data = _.toArray($scope.data);

    $scope.data = $.map($scope.data, function(a){
      return [[a[0].date.getTime(), a.length]];
    });
    $scope.data = _.sortBy($scope.data, function(d){return d[0]});
    $scope.data = [$scope.data];
    console.log('end drawChart', $scope.data);
  }
});
