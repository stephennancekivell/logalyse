'use strict';

analyseApp.directive('fileLoader', function() {
  return {
    template: '<div><input type="file" name="files[]"/></div>',
    restrict: 'E',
    scope: {
    	lines:'=',
    },
    link: function postLink(scope, element, attrs) {

      function handleFileSelect(evt) {
		    var files = evt.target.files; // FileList object

		    var reader = new FileReader();

		    reader.onload = function(e){
		    	scope.lines = e.target.result.split('\n');
		    	scope.$digest();
		    	scope.$parent.$digest();
		    }

		    reader.readAsText(files[0]);
			 }

			 element.find('input')[0].addEventListener('change', handleFileSelect, false);
	  }
  };
});
