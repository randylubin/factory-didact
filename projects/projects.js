'use strict';

angular.module('myApp.projects', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects.html',
    controller: 'ProjectsCtrl'
  });
}])

.controller('ProjectsCtrl', ['$scope', '$location', 'UserData', '$firebaseObject','$firebaseArray', '$document', function(scope, location, UserData, $firebaseObject, $firebaseArray, $document) {
  location.replace();
  location.url(location.path());
  scope.projects = null;

	var ref = new Firebase("https://didact.firebaseio.com/projects/");
	//scope.userData.capturedFeedback = $firebaseArray(refActuals);

	scope.projects = $firebaseArray(ref);

	scope.addProject = function(projectName){
		scope.projects.$add({
      name: projectName,
      survey: {
        "User's Name" : {
          "question": "User's Name"
        },
        "Product Rating" : {
          "question": "Product Rating"
        },
        "Email Address": {
          "question": "Email Address"
        },
        "Frequency": {
          "question" : "How often would you use it?"
        }
      }
    }).then(function(ref) {
      var id = ref.key();
		  scope.addProject = null;
      location.path("/projects/" + id);
    });
	};

  scope.goToProject = function (projects, project){
    location.search("project", project.name);
    location.path("/projects/" + projects.$keyAt(project));
  };

}]);
