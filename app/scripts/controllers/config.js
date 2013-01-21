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

	$scope.knownDateFormats = ['MMM dd HH:mm:ss', 'dd/MMM/yyyy:hh:mm:ss'];

	var idx = 0;
	$scope.nextLine = function(){
		$scope.line = analyseApp.lines[idx];
		$scope.parsedLine = analyseApp.lines[idx];
		idx +=1;
	}
	$scope.nextLine(); // set the first line

	$scope.p = userPrefs.get();
  if ($scope.p == null){
    $scope.p = analyseApp.defaultP;
  }

  $scope.$watch('p', function() {
    userPrefs.put($scope.p);
  }, true);

	$scope.$watch('p.dateFormat', function(newValue, oldvalue){
			$scope.date = $scope.buildDateFrom($scope.p.dateFormat);
	},true);

	$scope.buildDateFrom = function(format){
		var dateSearch = $scope.getRegexFromDateFormat(format);
		var regex = new RegExp('(' + dateSearch + ')', 'i');

		$scope.dateSearchMatched = regex.exec($scope.line);
		if ($scope.dateSearchMatched == null){
			$scope.parsedLine = $scope.line;
			return null;
		} else {
			$scope.parsedLine = $scope.line.replace(regex, '<span style="color:blue;">$1</span>');

			try {
	    	var dateString = $scope.line.match(new RegExp(dateSearch, "i"))[0];
	    	return Date.parseExact(dateString, format);
	    } catch(e) {
	    	return null;
	    }
	  }
	};

	$scope.guessDateFormat = function(){
		return _.reduce($scope.knownDateFormats, function(memo, format){
			if (memo != null) {
				return memo;
			} else {
				var date = $scope.buildDateFrom(format);
				if (date != null){
					return format;
				} else {
					return null;
				}
			}
		}, null);
	};

	$scope.next = function(){
		if ($scope.date == null){
			alert('set the date format first');
		} else {
			$location.url('/analyse');
		}
	}

	$scope.back = function(){
		window.location = "#/load";
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

	var df = $scope.guessDateFormat();
	if (df != null){
		console.log('date format guessed to be '+df);
		$scope.p.dateFormat = df;
	}
}]);