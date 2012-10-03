'use strict';

describe('Controller: FileOpenerCtrl', function() {

  // load the controller's module
  beforeEach(module('analyseApp'));

  var FileOpenerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    FileOpenerCtrl = $controller('FileOpenerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
