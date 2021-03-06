'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$location', 'UserData', function(scope, location, UserData) {
	scope.userData = UserData;
	scope.observerName = location.search().observer;
  location.replace();
	location.search('user', null)

	scope.newUser = function(){
		location.search('user', scope.userName);
		location.search('observer', scope.observerName)
		location.path('/capture')
	}

	scope.toLearnings = function(){
		location.path('/learnings')
	}

	scope.toEditSurvey = function(){
		location.path('/edit')
	}

}]);
