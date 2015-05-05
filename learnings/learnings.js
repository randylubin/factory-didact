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
	scope.learnings = {};
	

	var ref = new Firebase("https://didact.firebaseio.com/users/");
	//scope.userData.capturedFeedback = $firebaseArray(refActuals);

	var syncObject = $firebaseObject(ref);
	  // synchronize the object with a three-way data binding
	  // click on `index.html` above to see it used in the DOM!
	syncObject.$bindTo(scope, "learnings");


}]);
