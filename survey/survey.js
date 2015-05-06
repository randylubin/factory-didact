'use strict';

angular.module('myApp.survey', ['firebase', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/survey', {
    templateUrl: 'survey/survey.html',
    controller: 'SurveyCtrl'
  });
}])

.controller('SurveyCtrl', ['$scope', '$location', 'UserData', '$firebaseObject','$firebaseArray', function(scope, location, UserData, $firebaseObject, $firebaseArray) {

	scope.userData = UserData;

	scope.userName = location.search().user;
	scope.survey = {};


	var refUser = new Firebase("https://didact.firebaseio.com/users/" + location.search().user);
	  	// download the data into a local object
	var syncObject = $firebaseObject(refUser);
	  // synchronize the object with a three-way data binding
	syncObject.$bindTo(scope, "survey");

	scope.postData = function(){
		scope.survey.name = scope.userName;
		scope.userData.clear();
		location.path('/home')
	}

}]);
