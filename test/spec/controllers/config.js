'use strict';

describe('Controller: ConfigCtrl', function() {

  // load the controller's module
  beforeEach(module('analyseApp'));

  var ConfigCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ConfigCtrl = $controller('ConfigCtrl', {
      $scope: scope
    });
  }));
});
