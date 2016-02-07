angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $http, $location) {
	$scope.credentials = {
		username: "",
		password: ""
	}
	
	$scope.login = function() {
		if ($scope.credentials.username.length < 4){
			$("#login-error").text("Please enter a username of at least 4 characters").show();
		} else if ($scope.credentials.password.length < 4){
			$("#login-error").text("Please enter a password of at least 4 characters").show();
		} else {

			console.log($scope.credentials);

			$http({
				method:'POST',
				headers: {'Content-Type': 'application/json' },
				url: "http://" + apiHost + ":" + apiPort + "/users/login",
				data: {
					username: $scope.credentials.username,
					password: $scope.credentials.password
				}
			}).then(function successCallback(response){
				appScope.userLoggedIn = true;
			}, function errorCallback(response){
				console.log(response.data);
				$("#login-error").text("Username/Password combination incorrect").show();
			});
		}
	}
})

.controller('RegisterCtrl', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window) {
	$scope.credentials = {
		email: "",
		username: "",
		password1: "",
		password2: ""
	}
		
	$scope.register = function() {
		if(!isValidEmailAddress($scope.credentials.email)) {
			$("#login-error").text("Please enter a valid email address").show();
		} else if($scope.credentials.username.length < 4) {
			$("#login-error").text("Please enter a username of at least 4 characters").show();
		} else if($scope.credentials.password1.length < 4) {
			$("#login-error").text("Please enter a password of at least 4 characters").show();
		} else if($scope.credentials.password1 != $scope.credentials.password2)	{
			$("#login-error").text("Please make sure the passwords match").show();
		} else {
			$http({
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				url: "http://" + apiHost + ":" + apiPort + "/users",
				data: { 
					username: $scope.credentials.username,
					display_name: $scope.credentials.username,
					email: $scope.credentials.email,
					password: $scope.credentials.password1
				}
			}).then(function successCallback(response) {
				//$window.location.href = "/#/tab/login";
				$state.go('tab.login')
				$("#login-error").text("Account created!").show();
			}, function errorCallback(response) {
				console.log("connectie error");
			});
		}
	}
}])

.controller('WwCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.details = {
		location: "",
		date: "",
		hour: -1
	}
	
	$scope.weatherForecast = "";
	
	$scope.checkWeather = function() {
		$state.go('tab.ww.check-weather');
	}
	
	$scope.getForecast = function() {
		alert("yo");
	}
}])

.controller('AltCtrl', function($scope) {})

.controller('AltDetailCtrl', function($scope, $stateParams) {})

.controller('AccountCtrl', function($scope) {})

.controller('AppCtrl', function($scope) {
	appScope = $scope;
	$scope.userLoggedIn = true; // REMOVE
})
