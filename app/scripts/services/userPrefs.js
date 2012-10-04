'use strict';

analyseApp.factory('userPrefs', function() {
  var STORAGE_ID = 'userPrefs';
	return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');
    },
    put: function( data ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(data));
    }
  };
});
