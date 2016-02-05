var test =  "test";

angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope) {
	$scope.credentials = {
		username: "",
		password: ""
	}
	
	$scope.login = function() {
		alert($scope.credentials.username);
	}
})

.controller('RegisterCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.credentials = {
		email: "",
		username: "",
		password1: "",
		password2: ""
	}
		
	$scope.register = function() {
		if(!isValidEmailAddress($scope.credentials.email)) {
			alert("Please enter a valid email address");
		} else if($scope.credentials.username.length < 4) {
			alert("Please enter a username of at least 4 characters");
		} else if($scope.credentials.password1.length < 4) {
			alert("Please enter a password of at least 4 characters");
		} else if($scope.credentials.password1 != $scope.credentials.password2)	{
			alert("Please make sure the passwords match");
		} else {
			$http({
				method: 'POST',
				url: "http://" + apiHost + ":" + apiPort + "/users",
				data: { 
					username: $scope.credentials.username,
					display_name: $scope.credentials.username,
					email: $scope.credentials.email,
					password: $scope.credentials.password1
				}
			}).then(function successCallback(response) {
				alert(response.data.toSource());
			}, function errorCallback(response) {
				console.log(response);
			});
		}
	}
}])

.controller('WwCtrl', function($scope) {})

.controller('AltCtrl', function($scope) {})

.controller('AltDetailCtrl', function($scope, $stateParams) {})

.controller('AccountCtrl', function($scope) {})

.controller('AppCtrl', function($scope) {
	$scope.init = function() {
		console.log(test);
	}
})
