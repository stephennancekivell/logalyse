'use strict';

analyseApp.filter('inTags', function() {
  // The set of lines that match at least one tag
  return function(lines, tags) {
  	return _.filter(lines, function(line){
  		var isTag = _.map(tags, function(tag){
  			return (line.indexOf(tag.label) != -1);
  		});
      return _.reduce(isTag, function(a,b){
        return (a | b);
      }, false);
  	});
  };
});