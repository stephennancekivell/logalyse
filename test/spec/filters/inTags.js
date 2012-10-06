'use strict';

describe('Filter: inTags', function() {

  // load the filter's module
  beforeEach(module('analyseApp'));

  // initialize a new instance of the filter before each test
  var inTags;
  beforeEach(inject(function($filter) {
    inTags = $filter('inTags');
  }));

  it('should return the filtered input.', function() {
    var lines = ['a','b'];
    var tags = ['a'];

    var answer = inTags(lines, tags);
    
    expect(answer.length).toBe(1);
    expect(answer[0]).toBe('a');
  });

  it('shouldnt let anything through', function(){
    var lines = ['a','b'];
    var tags = [];

    var answer = inTags(lines, tags);
    
    expect(answer.length).toBe(0);
  });

  it('should only match valid matches', function(){
    var lines = ['Oct 7 07:35:11 stephen-ThinkPad-T520 rsyslogd: [origin software="rsyslogd" swVersion="5.8.6" x-pid="935" x-info="http://www.rsyslog.com"] rsyslogd was HUPed'];
    var tags = ['cron', 'nvidia'];

    var answer = inTags(lines, tags);
    
    expect(answer.length).toBe(0);
  });
});