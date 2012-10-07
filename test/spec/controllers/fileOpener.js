'use strict';

//have problems making this because of the fileloader part.
xdescribe('Controller: FileOpenerCtrl', function() {

  // load the controller's module
  beforeEach(module('analyseApp'));

  var FileOpenerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    FileOpenerCtrl = $controller('FileOpenerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    scope.lines = [
      'Oct 7 13:03:10 stephen-ThinkPad-T520 kernel: [ 7414.713167] nvidia 0000:01:00.0: restoring config space at offset 0x4 (was 0x0, writing 0xf0000000)',    
      'Oct 7 13:03:10 stephen-ThinkPad-T520 kernel: [ 7414.713167] nvidia 0000:01:00.0: restoring config space at offset 0x4 (was 0x0, writing 0xf0000000)'];
    scope.p = {
        tags : ['nvidia'],
        dateSearch: '\\w+\\s+\\d+\\s+\\d+:\\d+',
        dateFormat: 'MMM +d +HH:mm'
      }

    scope.drawChart()

    expect(scope.data).toBe([]);
  });
});
