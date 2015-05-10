'use strict';

angular.module('myApp.learnings', ['firebase', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/learnings', {
    templateUrl: 'learnings/learnings.html',
    controller: 'LearningsCtrl'
  });
}])

.controller('LearningsCtrl', ['$scope', '$location', 'UserData', '$firebaseObject','$firebaseArray', '$document', function(scope, location, UserData, $firebaseObject, $firebaseArray, $document) {
	scope.userData = UserData;
	scope.learnings = null;
  scope.deleteModalHidden = true;

  var refLearning = new Firebase("https://didact.firebaseio.com/users/");
  scope.learnings = $firebaseArray(refLearning);

	scope.goToUser = function(name) {
		location.search('user', name)
		location.path('/capture')
	}



}]);
