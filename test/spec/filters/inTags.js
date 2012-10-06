'use strict';

describe('Filter: inTags', function() {

  // load the filter's module
  beforeEach(module('analyseApp'));

  // initialize a new instance of the filter before each test
  var inTags;
  beforeEach(inject(function($filter) {
    inTags = $filter('inTags');
  }));

  it('should return the filtered input.', function() {
    var lines = ['a','b'];
    var tags = ['a'];

    var answer = inTags(lines, tags);
    console.log('answer',answer);
    
    expect(answer.length).toBe(1);
    expect(answer[0]).toBe('a');
  });

  it('shouldnt let anything through', function(){
    var lines = ['a','b'];
    var tags = [];

    var answer = inTags(lines, tags);
    console.log('answer',answer);
    
    expect(answer.length).toBe(0);
  });
});