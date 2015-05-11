'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects/:project', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$location', 'UserData', '$routeParams', '$firebaseArray',
  function(scope, location, UserData, $routeParams, $firebaseArray) {

	scope.userData = UserData;
	scope.observerName = location.search().observer;
  location.replace();
	location.search('user', null);
  scope.projectName = location.search().project

	scope.newUser = function(){
		location.search('user', scope.userName);
		location.search('observer', scope.observerName);
		location.path(location.path() + '/capture');
	};

	scope.toLearnings = function(){
		location.path(location.path() + '/learnings');
	};

	scope.toEditSurvey = function(){
		location.path(location.path() + '/edit');
	};

}]);
