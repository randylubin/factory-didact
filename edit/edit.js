'use strict';

angular.module('myApp.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/edit', {
    templateUrl: 'edit/edit.html',
    controller: 'EditCtrl'
  });
}])

.controller('EditCtrl', ['$scope', '$location', 'UserData', '$firebaseObject','$firebaseArray', '$document', function(scope, location, UserData, $firebaseObject, $firebaseArray, $document) {
	scope.survey = null;

	var ref = new Firebase("https://didact.firebaseio.com/survey/");
	//scope.userData.capturedFeedback = $firebaseArray(refActuals);

	scope.survey = $firebaseArray(ref);

	scope.addQuestion = function(questionName){
		scope.survey.$add(
			{question: questionName}
		);
		scope.newQuestion = null;
	};

}]);
