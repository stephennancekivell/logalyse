'use strict';

analyseApp.filter('viewTaggedLines', function() {

  return function(lines, tags, showAll) { 
  	if (showAll === true){
  		return lines;
  	} else {
  		var viewingTags = _.filter(tags, function(tag){
	  		return tag.view;
	  	});

	  	return _.filter(lines, function(line){
	  		var isTagged = _.map(viewingTags, function(tag){
	  			return (line.indexOf(tag.label) != -1);
	  		});
	  		return _.reduce(isTagged, function(a,b){
	        return (a | b);
	      }, false);
	  	});
  	}  	
  };
});
