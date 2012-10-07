'use strict';

analyseApp.controller('LinesViewerCtrl', function($scope) {
	console.log('LinesViewerCtrl');
	$scope.paginationStart = 0;
	$scope.paginationSize = 10;
	$scope.pLines = [];
	$scope.$watch('[lines, paginationStart]', function(){
		$scope.pLines = $scope.lines.slice($scope.paginationSize, $scope.paginationStart+$scope.paginationSize);
	});
});
