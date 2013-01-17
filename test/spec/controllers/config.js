'use strict';

describe('Controller: ConfigCtrl', function() {

  // load the controller's module
  beforeEach(module('analyseApp'));

  var ConfigCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfigCtrl = $controller('ConfigCtrl', {
      $scope: scope
    });
  }));

  it('Should generate regex from date format', function(){
    //07/Oct/2012:06:25:02
    expect(scope.getRegexFromDateFormat('dd/MMM/yyyy:hh:mm:ss')).toBe('\\d\\d/\\w\\w\\w/\\d\\d\\d\\d:\\d\\d:\\d\\d:\\d\\d');
    expect(scope.getRegexFromDateFormat('MMM dd HH:mm:ss')).toBe('\\w\\w\\w \\d\\d \\d\\d:\\d\\d:\\d\\d');
  });
});