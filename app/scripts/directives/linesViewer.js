'use strict';

analyseApp.directive('linesViewer', function() {
  return {
    template: '<div>'
              +'<input type="button" value="prev" ng-click="pageStart = pageStart-pageSize" />'
              +'<input type="button" value="next" ng-click="pageStart = pageStart+pageSize" />'
              +'<ul><li ng-repeat="line in pagedLines">{{line}}</li></ul></div>',
    restrict: 'E',
    scope: {
    	lines:'=',
        pageSize:'=',
        pageStart:'=',
    },
    link: function postLink(scope, element, attrs) {
        var pageSize = parseInt(scope.pageSize);
    	
        scope.pagedLines = [];
        
    	scope.$watch('lines', function(){
    		scope.pagedLines = scope.lines.slice(scope.pageStart, pageSize);
    	});

        scope.$watch('pageStart', function(){
            scope.pagedLines = scope.lines.slice(scope.pageStart, pageSize);
        });
    }
  };
});