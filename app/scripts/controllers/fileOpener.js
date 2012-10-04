'use strict';

analyseApp.controller('FileOpenerCtrl', function($scope) {
	$scope.fileText = '';
  $scope.subsetStart = 0;
	$scope.subsetCount = 5;
	$scope.lines = ['Sep 30 23:17:01 stephen-ThinkPad-T520 CRON[13174]: pam_unix(cron:session): session closed for user root'];
  $scope.dateSearch = "\\w+ \\d+ \\d+:\\d+"
  $scope.dateFormat = "MMM dd hh:mm"

	function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    console.log('files',files);

    var reader = new FileReader();

    reader.onload = function(e){
    	$scope.fileText = e.target.result;
    	$scope.lines = e.target.result.split('\n');
    	$scope.$digest();
    }

    reader.readAsText(files[0]);
  }
  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  $scope.getDate = function(line) {
  	var dateString = line.match(new RegExp($scope.dateSearch, "i"))[0];
  	return Date.parseExact(dateString, $scope.dateFormat);
  }

  $scope.getDateString = function(line){
  	var d = $scope.getDate(line);
  	if (d == null) {
  		return 'no date';
  	} else {
  		return d.toString($scope.dateFormat);
  	}
  }

  $scope.drawChart = function(){
    $scope.data = $.map($scope.lines.slice($scope.subsetStart, $scope.subsetStart+$scope.subsetCount), function(line){
  		return {date:$scope.getDate(line),count:0};
  	});
    console.log($scope.data);

    $scope.data = _.groupBy($scope.data, function(o){
      return o.date.getHours();
    });

    $scope.data = $.map($scope.data, function(a){
      return [a[0].date.getHours(), a.length];
    });
  }
});
