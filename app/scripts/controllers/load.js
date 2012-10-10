'use strict';

analyseApp.controller('LoadCtrl', function($scope, $location) {
	$scope.lines = undefined;

	$scope.next = function(){
		if ($scope.lines != undefined){
			analyseApp.file = $scope.lines;
			$location.url('/config');
		} else {
			alert('load a file first');
		}
	}
});
