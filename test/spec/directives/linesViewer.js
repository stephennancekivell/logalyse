'use strict';

describe('Directive: linesViewer', function() {
  beforeEach(module('analyseApp'));

  var element, scope;

  beforeEach(inject(function($rootScope, $compile){
  	scope = $rootScope.$new();
  	scope.linesIn = [];
  	scope.pageStart = 0;
    element = angular.element('<lines-viewer lines="linesIn" page-start="pageStart" page-size="10"></lines-viewer>');
    element = $compile(element)(scope);
  }));

  it('should render some lines', function() {
    expect(element.find('li').size()).toBe(0);

    scope.linesIn = ['a'];
    scope.$digest();
    expect(element.find('li').size()).toBe(1);
    
    scope.linesIn = ['1','2','3','4','5','6','7','8','9','10','11'];
    scope.$digest();
    expect(element.find('li').size()).toBe(10);
  });

  it('changing pageStart should change what items are displayed', function(){
  	scope.linesIn = ['a','b','c'];
  	scope.pageStart = 0;
  	scope.$digest();
  	expect(element.find('li').size()).toBe(3);

  	scope.pageStart = 1;
  	scope.$digest();
  	expect(element.find('li').size()).toBe(2);
  });
});