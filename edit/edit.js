'use strict';

angular.module('myApp.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects/:project/edit', {
    templateUrl: 'edit/edit.html',
    controller: 'EditCtrl'
  });
}])

.controller('EditCtrl', ['$scope', '$location', 'UserData', '$firebaseObject','$firebaseArray', '$document', '$routeParams',
 function(scope, location, UserData, $firebaseObject, $firebaseArray, $document, $routeParams) {
	scope.survey = null;

	var ref = new Firebase("https://didact.firebaseio.com/projects/" + $routeParams.project + "/survey/");

	scope.survey = $firebaseArray(ref);

	scope.addQuestion = function(questionName){
		scope.survey.$add(
			{question: questionName}
		);
		scope.newQuestion = null;
	};

  scope.toLearnings = function(){
    location.path("/projects/" + $routeParams.project + '/learnings');
  };

  scope.toNewUser = function(){
    location.path("/projects/" + $routeParams.project);
  };


}]);
