'use strict';

analyseApp.controller('FileOpenerCtrl', function($scope, userPrefs) {
  $scope.lines = ['Sep 30 23:17:01 stephen-ThinkPad-T520 CRON[13174]: pam_unix(cron:session): session closed for user root'];

  $scope.p = userPrefs.get();

  $scope.$watch('p', function(){
    userPrefs.put($scope.p);
  },true);
  
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
  	var dateString = line.match(new RegExp($scope.p.dateSearch, "i"))[0];
    console.log('dateString', dateString);
  	return Date.parseExact(dateString, $scope.p.dateFormat);
  }

  $scope.drawChart = function(){
    $scope.data = $.map($scope.lines.slice($scope.p.subsetStart, $scope.p.subsetStart+$scope.p.subsetCount), function(line){
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
