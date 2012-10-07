'use strict';

xdescribe('Directive: fileLoader', function() {
  beforeEach(module('analyseApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<file-loader></file-loader>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the fileLoader directive');
  }));
});
