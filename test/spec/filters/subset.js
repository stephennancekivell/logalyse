'use strict';

xdescribe('Filter: subset', function() {

  // load the filter's module
  beforeEach(module('analyseApp'));

  // initialize a new instance of the filter before each test
  var subset;
  beforeEach(inject(function($filter) {
    subset = $filter('subset');
  }));

  it('should return the input prefixed with "subset filter:"', function() {
    var text = 'angularjs';
    expect(subset(text)).toBe('subset filter: ' + text);
  });

});
