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

	location.url(location.path())

	scope.newUser = function(){
		location.search('user', scope.userName);
		location.path('/capture')
	}

	scope.toLearnings = function(){
		location.path('/learnings')
	}

}]);
