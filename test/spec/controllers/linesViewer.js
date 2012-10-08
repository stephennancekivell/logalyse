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
});
