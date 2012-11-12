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
    var tags = [{label:'a',plot:true,view:true},
                {label:'b',plot:true,view:false}];
    
    expect(viewTaggedLines(lines,tags)).toEqual(['a']);
  });

  it('should remove lines not tagged', function(){
    var lines = ['a'];
    var tags = [];

    expect(viewTaggedLines(lines,tags)).toEqual([]);
  });

  it('should show all when showAll', function(){
    var lines = ['a','b','c'];
    var tags = [{label:'a',plot:true,view:true},
                {label:'b',plot:true,view:false}];

    expect(viewTaggedLines(lines,tags,true)).toEqual(['a','b','c']);
  });
});
