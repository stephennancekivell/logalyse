'use strict';

analyseApp.controller('LoadCtrl', ['$scope','$location',function($scope, $location) {
	$scope.lines = null;

	$scope.next = function(){
		if ($scope.lines != null){
			analyseApp.file = $scope.lines;
			$location.url('/config');
		} else {
			alert('load a file first');
		}
	}
}]);
