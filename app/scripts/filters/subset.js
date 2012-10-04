'use strict';

analyseApp.filter('subset', function() {
  return function(input, start, count) {
    return input.slice(parseInt(start),parseInt(start)+parseInt(count));
  };
});
