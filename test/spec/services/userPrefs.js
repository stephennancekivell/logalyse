'use strict';

describe('Service: userPrefs', function () {

  // load the service's module
  beforeEach(module('analyseApp'));

  // instantiate service
  var userPrefs;
  beforeEach(inject(function(_userPrefs_) {
    userPrefs = _userPrefs_;
  }));

  it('should do something', function () {
    expect(!!userPrefs).toBe(true);
  });

});
