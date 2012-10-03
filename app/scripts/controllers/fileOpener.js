'use strict';

analyseApp.controller('FileOpenerCtrl', function($scope) {
	$scope.fileText = '';
	$scope.limit = 5
	$scope.lines = ['Sep 30 23:17:01 stephen-ThinkPad-T520 CRON[13174]: pam_unix(cron:session): session closed for user root'];
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

  $scope.getDate = function(line) {
  	var dateString = line.match(new RegExp($scope.dateSearch, "i"))[0];
  	return Date.parse(dateString).toString("d-M-yy");
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
});
