'use strict';

// Declare app level module which depends on filters, and services
var analyseApp = angular.module('analyseApp', ['ui'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/analyse', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/load', {
        templateUrl: 'views/load.html',
        controller: 'LoadCtrl'
      })
      .when('/config', {
        templateUrl: 'views/config.html',
        controller: 'ConfigCtrl'
      })
      .otherwise({
        redirectTo: '/load'
      });
  }]);
