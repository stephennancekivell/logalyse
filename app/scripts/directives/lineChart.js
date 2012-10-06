'use strict';

analyseApp.directive('lineChart', function() {
  return {
    restrict: 'A',
    scope: {
    	data:'='
    },
    link: function postLink(scope, element, attrs) {
    	scope.$watch('data', function(){
    		if (typeof scope.data != 'undefined'){
                var conf = {
                    points: { show : true },
                    lines: { show: true },
                    xaxis: {
                        mode: 'time'
                    }
                };
	    		$.plot(element, scope.data, conf);
	    	}
    	});
    }
  };
});
