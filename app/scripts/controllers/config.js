'use strict';

analyseApp.controller('ConfigCtrl', ['$scope','$location', 'userPrefs', function($scope, $location, userPrefs) {
	var idx = 0;

	if (typeof analyseApp.file == 'undefined'){
		$location.url('/load');
	}

	$scope.nextLine = function(){
		$scope.line = analyseApp.file[idx];
		idx +=1;
	}
	$scope.nextLine();

	$scope.$watch('[p.dateSearch, p.dateFormat]', function(){
		var regex = new RegExp('(' + $scope.p.dateSearch + ')', 'i');

		$scope.dateSearchMatched = regex.exec($scope.line);
		if ($scope.dateSearchMatched == null){
			$scope.parsedLine = $scope.line;
			$scope.date = null;
		} else {
			$scope.parsedLine = $scope.line.replace(regex, '<span style="color:blue;">$1</span>');

			try {
	    	var dateString = $scope.line.match(new RegExp($scope.p.dateSearch, "i"))[0];
	    	$scope.date = Date.parseExact(dateString, $scope.p.dateFormat);
	    } catch(e) {
	    	$scope.date = null;
	    	$scope.formatWorks = false;
	    }
	  }
		
	},true);

	$scope.next = function(){
		if ($scope.date == null){
			alert('set the date format first');
		} else {
			$location.url('/analyse');
		}
	}

	$scope.back = function(){
		$location.url('/load');
	}

	$scope.p = userPrefs.get();
  if ($scope.p == null){
    $scope.p = analyseApp.defaultP;
  }

  $scope.$watch('p', function() {
    userPrefs.put($scope.p);
  }, true);
}]);