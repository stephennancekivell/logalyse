'use strict';

describe('Directive: lineChart', function() {
  beforeEach(module('analyseApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<line-chart></line-chart>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the lineChart directive');
  }));
});
