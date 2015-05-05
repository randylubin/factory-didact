'use strict';

angular.module('myApp.capture', ['firebase', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/capture', {
    templateUrl: 'capture/capture.html',
    controller: 'CaptureCtrl'
  });
}])

.controller('CaptureCtrl', ['$scope', '$location', 'UserData', '$firebaseObject','$firebaseArray', '$document', function(scope, location, UserData, $firebaseObject, $firebaseArray, $document) {
	scope.userData = UserData;
	scope.actuals = [];
	

	var refActuals = new Firebase("https://didact.firebaseio.com/users/" + location.search().user + "/actuals");
	//scope.userData.capturedFeedback = $firebaseArray(refActuals);

	var syncObject = $firebaseObject(refActuals);
	  // synchronize the object with a three-way data binding
	  // click on `index.html` above to see it used in the DOM!
	syncObject.$bindTo(scope, "actuals");

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
	]

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
		});
	}

	scope.takePhoto = function(){
		var photo = document.getElementById('capturePhoto');
		photo.click();
	}

	scope.saveFeedback = function(text){

		var startTime = new Date();
		scope.userData.capturedFeedback.push({
			feedback: text,
			tags: scope.tags,
			time: startTime.toString(),
			photo: scope.smallPhoto
		})

		scope.actuals.feedback = scope.userData.capturedFeedback;

		scope.feedback = {}
		angular.forEach(scope.tags, function(tag){
			tag.selected = false;
		})

	}

	scope.continue = function(){
		location.path('/survey')
	}

}]);
