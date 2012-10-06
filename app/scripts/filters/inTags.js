'use strict';

analyseApp.filter('inTags', function() {
  // The set of lines that match at least one tag
  return function(lines, tags) {
  	return _.filter(lines, function(line){
  		var isTag = _.map(tags, function(tag){
        if (line.indexOf('rsyslogd') != -1) {console.log('index',line, tag, line.indexOf(tag));}
  			return (line.indexOf(tag) != -1);
  		});
      return _.reduce(isTag, function(a,b){
        return (a | b);
      }, false);
  	});
  };
});