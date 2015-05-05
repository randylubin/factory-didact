'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'firebase',
  'ngRoute',
  'myApp.home',
  'myApp.survey',
  'myApp.capture',
  'myApp.learnings'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]).
factory('UserData', function() {
  var data = {
  	capturedFeedback: [],
  	survey: {}
  };

  data.clear = function(){
  	data.capturedFeedback = []
  	data.survey = {}
  }

  return data;
});
