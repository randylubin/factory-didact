'use strict';

angular.module('myApp.capture', ['firebase', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects/:project/capture', {
    templateUrl: 'capture/capture.html',
    controller: 'CaptureCtrl'
  });
}])

.controller('CaptureCtrl', ['$scope', '$location', 'UserData', '$firebaseObject','$firebaseArray', '$document', '$routeParams',
 function(scope, location, UserData, $firebaseObject, $firebaseArray, $document, $routeParams) {
	scope.userData = UserData;
	scope.syncedData = {};
	scope.smallPhoto = null;
  location.replace();
	scope.userName = location.search().user;
	scope.syncedData.description = location.search().user;

	if (!location.search().observer) {
		location.search('observer', 'Anonymous');
	}

	if (!location.search().user) {
		var random = Math.floor(Math.random() * 1000000);
		location.search('user', random);
	}

	var refActuals = new Firebase("https://didact.firebaseio.com/projects/" + $routeParams.project + "/users/" + location.search().user + "/capturedData");
	//scope.userData.capturedFeedback = $firebaseArray(refActuals);

	var syncObject = $firebaseObject(refActuals);
	  // synchronize the object with a three-way data binding
	  // click on `index.html` above to see it used in the DOM!
	syncObject.$bindTo(scope, "syncedData");

	var refSurvey = new Firebase("https://didact.firebaseio.com/projects/" + $routeParams.project + "/survey/");
	scope.surveyQuestions = $firebaseArray(refSurvey);

	scope.feedback = {};

	scope.tags = [
		{
			name: 'Bug',
			selected: false
		},
		{
			name: 'UX',
			selected: false
		},
		{
			name: 'Feature',
			selected: false
		},
		{
			name: 'Other',
			selected: false
		}
	];

	if (!scope.userData.capturedFeedback) {
		scope.userData.capturedFeedback = []
	}

	scope.processPhoto = function(){
		var photo = document.getElementById('capturePhoto').files[0];

		var scaleImage;

		scaleImage = function(maxWidth, maxHeight, currentWidth, currentHeight) {
		  var ratio;
		  ratio = currentHeight / currentWidth;
		  if (currentWidth >= maxWidth && ratio <= 1) {
		    currentWidth = maxWidth;
		    currentHeight = currentWidth * ratio;
		  } else if (currentHeight >= maxHeight) {
		    currentHeight = maxHeight;
		    currentWidth = currentHeight / ratio;
		  }
		  return [currentWidth, currentHeight];
		};

		var resizeImage = function(imageSource, cb) {
		  var img;
		  img = new Image();
		  img.onload = function() {
		    var canvas, ctx, scaledHeight, scaledSize, scaledWidth;
		    scaledSize = scaleImage(600, 600, img.width, img.height);
		    scaledWidth = scaledSize[0];
		    scaledHeight = scaledSize[1];
		    canvas = document.createElement('canvas');
		    canvas.height = canvas.width * (img.height / img.width);
		    ctx = canvas.getContext('2d');
		    canvas.width = scaledWidth;
		    canvas.height = scaledHeight;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

		    return cb(canvas.toDataURL());
		  };
		  return img.src = URL.createObjectURL(imageSource);
		};

		resizeImage(photo, function(image){
			scope.smallPhoto = image;
			scope.saveFeedback();
			scope.$apply();
		});
	};

	scope.takePhoto = function(){
		var photo = document.getElementById('capturePhoto');
		photo.click();
	}

	scope.saveFeedback = function(){
		var text = scope.feedback.text;
		var photo = scope.smallPhoto;

		if (text || photo) {

			var startTime = new Date();

			if (!scope.syncedData.feedback) {
				scope.syncedData.feedback = [];
			}

			if (!text && photo){
				text = "Photo: ";
			}

			scope.syncedData.feedback.push({
				feedback: text,
				//tags: scope.tags,
				time: startTime.toString(),
				photo: photo
			});
		}

		scope.syncedData.dateLastEdited = new Date().getTime();
		scope.feedback.text = null;
			angular.forEach(scope.tags, function(tag){
				tag.selected = false;
		});
		scope.smallPhoto = null;
		if (!scope.syncedData.observer) {
			scope.syncedData.observer = location.search().observer;
		}
	};

  scope.toEditSurvey = function(){
    scope.syncedData.description = location.search().user;

		if (!scope.syncedData.observer) {
			scope.syncedData.observer = location.search().observer;
		}

		scope.userData.clear();
		location.path("/projects/" + $routeParams.project + '/edit');
  };

	scope.postData = function(){
		scope.syncedData.description = location.search().user;

		if (!scope.syncedData.observer) {
			scope.syncedData.observer = location.search().observer;
		}

		scope.userData.clear();
		location.path("/projects/" + $routeParams.project + '/learnings');
	};

}]);
