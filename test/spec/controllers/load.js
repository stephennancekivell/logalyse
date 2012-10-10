'use strict';

describe('Controller: LoadCtrl', function() {

  // load the controller's module
  beforeEach(module('analyseApp'));

  var LoadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    LoadCtrl = $controller('LoadCtrl', {
      $scope: scope
    });
  }));
});
