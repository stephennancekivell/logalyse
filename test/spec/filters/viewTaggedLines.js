'use strict';

describe('Filter: viewTaggedLines', function() {

  // load the filter's module
  beforeEach(module('analyseApp'));

  // initialize a new instance of the filter before each test
  var viewTaggedLines;
  beforeEach(inject(function($filter) {
    viewTaggedLines = $filter('viewTaggedLines');
  }));

  it('should remove lines tagged !view', function() {
    var lines = ['a','b'];
    var tags = [{value:'a',plot:true,view:true},
                {value:'b',plot:true,view:false}];
    
    expect(viewTaggedLines(lines,tags)).toEqual(['a']);
  });

  it('should remove lines not tagged', function(){
    var lines = ['a'];
    var tags = [];

    expect(viewTaggedLines(lines,tags)).toEqual([]);
  });
});
