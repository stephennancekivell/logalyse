'use strict';

analyseApp.controller('FileOpenerCtrl', function($scope) {
	$scope.fileText = '';
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
});
