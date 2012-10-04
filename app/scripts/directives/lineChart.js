'use strict';

analyseApp.directive('lineChart', function() {
  return {
    restrict: 'A',
    scope: {
    	data:'='
    },
    link: function postLink(scope, element, attrs) {
    	scope.$watch('data', function(){
    		console.log(scope.data);
    		if (typeof scope.data != 'undefined'){
	    		$.plot(element, scope.data, { yaxis: { max: 1 } });
	    	}
    	});
    }
  };
});
