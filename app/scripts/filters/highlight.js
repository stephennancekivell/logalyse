'use strict';

analyseApp.filter('highlight', function() {
  return function(input, query) {  		
  	return $.map(input, function(line){
  		var regex = new RegExp('(' + query + ')', 'i');
			return line.replace(regex, '<span style="color:blue;">$1</span>');
  	});
  };
});
