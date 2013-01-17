'use strict';

analyseApp.controller('LoadCtrl', ['$scope','$location',function($scope, $location) {
	$scope.onload = function(file){
		analyseApp.lines = file.split('\n');
		window.location = "#/config";
	};
}]);
