'use strict';

angular.module('myApp.learnings', ['firebase', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects/:project/learnings', {
    templateUrl: 'learnings/learnings.html',
    controller: 'LearningsCtrl'
  });
}])

.controller('LearningsCtrl', ['$scope', '$location', 'UserData', '$firebaseObject','$firebaseArray', '$document', '$routeParams',
 function(scope, location, UserData, $firebaseObject, $firebaseArray, $document, $routeParams) {
	scope.userData = UserData;
	scope.learnings = null;
  scope.deleteModalHidden = true;

  var refLearning = new Firebase("https://didact.firebaseio.com/projects/"+ $routeParams.project +"/users/");
  scope.learnings = $firebaseArray(refLearning);

	scope.goToUser = function(learning) {
    var keyId = scope.learnings.$keyAt(learning);
		location.search('user', keyId);
		location.path('/projects/'+ $routeParams.project +'/capture');
	};

  scope.toNewUser = function(){
    location.path("/projects/" + $routeParams.project);
  };

  scope.toEditSurvey = function(){
    location.path("/projects/" + $routeParams.project + "/edit");
  };



}]);
