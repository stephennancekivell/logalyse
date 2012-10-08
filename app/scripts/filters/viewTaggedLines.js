'use strict';

analyseApp.filter('viewTaggedLines', function() {

  return function(lines, tags) { 
  	var viewingTags = _.filter(tags, function(tag){
	  		return tag.view;
	  	});

  	return _.filter(lines, function(line){
  		var isTagged = _.map(viewingTags, function(tag){
  			return (line.indexOf(tag.value) != -1);
  		});
  		return _.reduce(isTagged, function(a,b){
        return (a | b);
      }, false);
  	});
  };
});