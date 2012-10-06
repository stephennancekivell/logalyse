'use strict';

analyseApp.directive('linesViewer', function() {
  return {
    template: '<ul><li ng-repeat="line in pagedLines">{{line}}</li></ul>',
    restrict: 'E',
    scope: {
    	lines:'=',
        pageSize:'=',
        pageStart:'=',
    },
    link: function postLink(scope, element, attrs) {
        var pageSize = parseInt(scope.pageSize);
        var increment = 10;
    	
        scope.pagedLines = [];
        
    	scope.$watch('lines', function(){
    		scope.pagedLines = scope.lines.slice(scope.pageStart, pageSize);
    	});

        scope.$watch('pageStart', function(){
            scope.pagedLines = scope.lines.slice(scope.pageStart, pageSize);
            console.log('pageStart');
        });

        var raw = element[0];

        var eee = element;

        var ul = element.children();

        ul.bind('scroll', function() {
            console.log('scroll');
            if (ul[0].scrollTop + ul[0].offsetHeight >= ul[0].scrollHeight) {

                if(scope.pageStart + increment < scope.lines.length){

                    console.log('+', ul[0].scrollTop, ul[0].offsetHeight, ul[0].scrollHeight);
                    scope.pageStart+=increment;
                    ul[0].scrollTop=0;
                    console.log('++', ul[0].scrollTop, ul[0].offsetHeight, ul[0].scrollHeight);
                    scope.$digest();
                    ul[0].scrollTop=0;
                }
            }
        });

    	// element.children().bind('scroll', function(e) {
    	// 	scope.pageStart += 1;
    	// 	element.children().scrollTop =0;
	    // });
    }
  };
});