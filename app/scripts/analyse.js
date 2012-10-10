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

analyseApp.defaultP = {
  "showAll":true,
  "subsetStart":"0",
  "subsetCount":"1000",
  "dateSearch":"\\w+\\s+\\d+\\s+\\d+:\\d+",
  "dateFormat":"MMM +d +HH:mm",
  "tags":[{values:""}]};

analyseApp.file = ['Sep 30 23:17:01 stephen-ThinkPad-T520 CRON[13174]: pam_unix(cron:session): session closed for user root'];