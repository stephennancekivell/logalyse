'use strict';

analyseApp.controller('ConfigCtrl', ['$scope','$location', 'userPrefs', function($scope, $location, userPrefs) {
	$scope.date = true;	// having this fixes the issue where onload the date format tick would be the warning sign
	$scope.dateFormatToRegex = {
		's': '\\d',
		'm': '\\d',
		'h': '\\d',
		'H': '\\d',
		'd': '\\d',
		'M': '\\w',
		'y': '\\d',
		't': '\\w'
	};

	var idx = 0;
	$scope.nextLine = function(){
		$scope.line = analyseApp.file[idx];
		idx +=1;
	}
	$scope.nextLine();

	$scope.p = userPrefs.get();
  if ($scope.p == null){
    $scope.p = analyseApp.defaultP;
  }

  $scope.$watch('p', function() {
    userPrefs.put($scope.p);
  }, true);

	$scope.$watch('p.dateFormat', function(){
		$scope.buildDate();
	},true);

	$scope.buildDate = function(){
		var dateSearch = $scope.getRegexFromDateFormat($scope.p.dateFormat);
		var regex = new RegExp('(' + dateSearch + ')', 'i');

		$scope.dateSearchMatched = regex.exec($scope.line);
		if ($scope.dateSearchMatched == null){
			$scope.parsedLine = $scope.line;
			$scope.date = null;
		} else {
			$scope.parsedLine = $scope.line.replace(regex, '<span style="color:blue;">$1</span>');

			try {
	    	var dateString = $scope.line.match(new RegExp(dateSearch, "i"))[0];
	    	$scope.date = Date.parseExact(dateString, $scope.p.dateFormat);
	    } catch(e) {
	    	$scope.date = null;
	    }
	  }
	};

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

  $scope.getRegexFromDateFormat = function(format){
		var regex = "";
		_.each(format, function(x){
			if ($scope.dateFormatToRegex.hasOwnProperty(x)){
				regex += $scope.dateFormatToRegex[x];
			} else {
				regex += x;
			}
		});
		return regex;
	}
}]);