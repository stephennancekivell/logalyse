'use strict';

analyseApp.filter('subset', function() {
  return function(input, start, count) {
    return input.slice(start,start+count);
  };
});
