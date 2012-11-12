'use strict';

//have problems making this because of the fileloader part.
describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('analyseApp'));

  var FileOpenerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    FileOpenerCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  beforeEach(function(){
    scope.p = {
        tags : [{value:'nvidia'}],
        dateSearch: '\\w+\\s+\\d+\\s+\\d+:\\d+',
        dateFormat: 'MMM +d +HH:mm',
        groupBy: 1
      }
  });

  it('should count how many logs match per timestamp', function() {
    analyseApp.file = [
      'Oct 7 13:03:10 stephen-ThinkPad-T520 kernel: [ 7414.713167] nvidia 0000:01:00.0: restoring config space at offset 0x4 (was 0x0, writing 0xf0000000)',    
      'Oct 7 13:03:10 stephen-ThinkPad-T520 kernel: [ 7414.713167] nvidia 0000:01:00.0: restoring config space at offset 0x4 (was 0x0, writing 0xf0000000)',
      'Oct 8 14:04:10 stephen-ThinkPad-T520 kernel: [ 7414.713167] nvidia 0000:01:00.0: restoring config space at offset 0x4 (was 0x0, writing 0xf0000000)'];
    
    scope.buildChart();

    expect(scope.data).toEqual([{
      value:'nvidia',
      label:'nvidia',
      data:[
        {date: new Date(1349568180000),lineNumber:0, count:2},
        {date: new Date(1349658240000),lineNumber:2, count:1}]}]);
  });

  it('should ignore lines that dont match a tag.', function() {
    scope.p.tags = [{value:'notThat'}];
    analyseApp.file = [
      'Oct 7 13:03:10 stephen-ThinkPad-T520 kernel: [ 7414.713167] nvidia 0000:01:00.0: restoring config space at offset 0x4 (was 0x0, writing 0xf0000000)',    
      'Oct 7 13:03:10 stephen-ThinkPad-T520 kernel: [ 7414.713167] nvidia 0000:01:00.0: restoring config space at offset 0x4 (was 0x0, writing 0xf0000000)'];
    
    scope.buildChart();

    expect(scope.data[0].data).toEqual([]);
  });

  it('should graph each tag as a different line', function(){
    scope.p.tags = [{value:'nvidia'},{value:'cron'}];
    analyseApp.file = [
      'Oct 7 13:03:10 stephen-ThinkPad-T520 kernel: [ 7414.713167] nvidia 0000:01:00.0: restoring config space at offset 0x4 (was 0x0, writing 0xf0000000)',    
      'Oct 7 13:03:10 stephen-ThinkPad-T520 kernel: [ 7414.713167] cron 0000:01:00.0: restoring config space at offset 0x4 (was 0x0, writing 0xf0000000)',
      'Oct 8 14:04:10 stephen-ThinkPad-T520 kernel: [ 7414.713167] nvidia 0000:01:00.0: restoring config space at offset 0x4 (was 0x0, writing 0xf0000000)'];
    
    scope.buildChart();

    expect(scope.data).toEqual([
      { value:'nvidia',
        label:'nvidia',
        data:[
          {date: new Date(1349568180000),lineNumber:0, count:1},
          {date: new Date(1349658240000),lineNumber:2, count:1}]
      },
      { value:'cron',
        label:'cron',
        data:[
          {date: new Date(1349568180000),lineNumber:1, count:1}]
      }]);
  });
});