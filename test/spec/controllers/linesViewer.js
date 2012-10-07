'use strict';

describe('Controller: LinesViewerCtrl', function() {

  // load the controller's module
  beforeEach(module('analyseApp'));

  var LinesViewerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    LinesViewerCtrl = $controller('LinesViewerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
