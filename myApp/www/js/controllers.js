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

			$http({
				method:'POST',
				headers: {'Content-Type': 'application/json' },
				url: "http://" + apiHost + ":" + apiPort + "/users/login",
				data: {
					username: $scope.credentials.username,
					password: $scope.credentials.password
				}
			}).then(function successCallback(response){
				appScope.user.id = response.data.user._id;
				appScope.user.display_name = response.data.user.display_name;
				//appScope.user.password = response.data.user.password;
				//appScope.user.username = response.data.user.username;
				//appScope.user.balance = response.data.user.balance;

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
					e_mail: $scope.credentials.email,
					password: $scope.credentials.password1
				}
			}).then(function successCallback(response) {
				//$window.location.href = "/#/tab/login";
				$state.go('tab.login');
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

.controller('AccountCtrl', ['$scope', '$state', '$window', '$http', function($scope, $state, $window, $http) {
	$scope.profileDetails = {};

	$scope.initAccount = function() {
		console.log(appScope.user.id);

		$http({
			method: 'GET',
			url: "http://" + apiHost + ":" + apiPort + "/users/" + appScope.user.id + "",
			headers: {'Content-Type': 'application/json'},
		}).then(function successCallback(response) {
			$scope.profileDetails.username = response.data.user.username;
			$scope.profileDetails.display_name = response.data.user.display_name;
			$scope.profileDetails.balance = response.data.user.balance;
			$scope.profileDetails.password = response.data.user.password;
			$scope.profileDetails.password2 = response.data.user.password;

			console.log($scope.profileDetails);
		}, function errorCallback(response) {
		    console.log('connection error');
		});
	}

	$scope.saveAccount = function(){
		if ($scope.profileDetails.username.length < 4){
			$("#login-error").text("Username should at least be 4 characters long").show();
		} else if ($scope.profileDetails.display_name.length < 4){
			$("#login-error").text("Display name should at least be 4 characters long").show();
		} else if ($scope.profileDetails.balance < 0){
			$("#login-error").text("Balance can't be lower then 0").show();
		} else if ($scope.profileDetails.password.length < 4 || $scope.profileDetails.password2.length < 4){
			$("#login-error").text("Please make sure the password is at least 4 characters long").show();
		} else if ($scope.profileDetails.password != $scope.profileDetails.password2){
			$("#login-error").text("Please make sure the passwords match").show();
		} else {
			$http({
				method: 'PUT',
				url: "http://" + apiHost + ":" + apiPort + "/users/" + appScope.user.id + "",
				headers: {'Content-Type': 'application/json'},
				data: {
					username: $scope.profileDetails.username,
					display_name: $scope.profileDetails.display_name,
					password: $scope.profileDetails.balance,
					description: $scope.profileDetails.password,
				}
			}).then(function successCallback(response) {
				appScope.user.display_name = $scope.profileDetails.display_name;
				$("#login-error").text("Account saved!").show();
			}, function errorCallback(response) {
			    console.log('connection error');
			});
		}
	}

	$scope.logOut = function() {
		location.reload();
	}
}])

.controller('AppCtrl', function($scope) {
	appScope = $scope;
	$scope.user = {}
	
	//$scope.userLoggedIn = true; // DEVELOPER MODE
})
