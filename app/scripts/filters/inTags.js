'use strict';

analyseApp.filter('inTags', function() {
  return function(lines, tags) {
  	return _.filter(lines, function(line){
  		var isTag = _.map(tags, function(tag){
  			return (line.indexOf(tag) != -1);
  		});
  		return _.reduce(isTag, function(a,b){
  			return (a || b);
  		});
  	});
  };
});