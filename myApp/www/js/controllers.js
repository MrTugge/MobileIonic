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

.controller('WwCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
	$scope.currentDate = new Date();
	$scope.maxDate = new Date();
	$scope.maxDate.setDate($scope.maxDate.getDate() + 5);
	
	$scope.details = {
		location: "",
		date: ($scope.currentDate.getMonth() + 1)+ "/" + $scope.currentDate.getDate() + "/" + $scope.currentDate.getFullYear(),
		hour: 12
	}
	
	$scope.weatherForecast = "";
	
	$scope.checkWeather = function() {
		if($scope.details.location.length < 3) {
			alert("Please enter a valid location");
		} else if($scope.details.hour < 0 || $scope.details.hour > 23) {
			alert("Please enter a valid hour of the day")
		} else {
			$http({
				method: 'GET',
				url: "http://" + apiHost + ":" + apiPort + "/weather/forecast?date=" + $scope.details.date + "&hour=" + $scope.details.hour + "&location=" + $scope.details.location
			}).then(function successCallback(response) {
				var weather = response.data.result.weather.description;
				var iconUrl = response.data.result.weather.icon;
				$scope.weatherForecast = weather + " <img src='http://openweathermap.org/img/w/" + iconUrl + ".png' />";
				appScope.walkDetails = $scope.details;
				appScope.weatherForecast = $scope.weatherForecast;
				$state.go('tab.ww-check-weather');
			}, function errorCallback(response) {
				console.log("connectie error");
			});
		}
	}
	
	$scope.getForecast = function() {
		$scope.details = appScope.walkDetails;
		$scope.weatherForecast = appScope.weatherForecast;
		$("#weather-forecast").html($scope.weatherForecast);
	}
	
	$scope.planWalk = function() {
		$state.go("");
	}
	
	$scope.checkAlternatives = function() {
		$state.go("tab.alt");
	}
	
	$scope.datePickerCallback = function(date) {
		var day = date.getDate();
		var monthIndex = (date.getMonth() + 1);
		var year = date.getFullYear();
		$scope.details.date = monthIndex + "/" + day + "/" + year;
	}
}])

.controller('AltCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
	$scope.popularMovies = [];
	
	$scope.loadPopularMovies = function() {
		$http({
			method: 'GET',
			url: "http://" + apiHost + ":" + apiPort + "/imdb/popular"
		}).then(function successCallback(response) {
			$scope.popularMovies = response.data.result;
		}, function errorCallback(response) {
			console.log("connectie error");
		});
	}
	
	$scope.showMovie = function(movieId) {
		$http({
			method: 'GET',
			url: "http://" + apiHost + ":" + apiPort + "/imdb/" + movieId
		}).then(function successCallback(response) {
			appScope.movieDetails = response.data.result;
			$state.go("tab.alt-detail");
		}, function errorCallback(response) {
			console.log("connectie error");
		});
	}
}])

.controller('AltDetailCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
	$scope.movie = {};
	
	$scope.init = function() {
		$scope.movie = appScope.movieDetails;
	}
	
	$scope.buyMovie = function(movieId) {
		
		$http({
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			url: "http://" + apiHost + ":" + apiPort + "/users/transaction",
			data: { 
				description: movieId,
				amount: 9.95,
				user_id: appScope.user._id
			}
		}).then(function successCallback(response) {
			alert("Bedankt voor de aankoop")
		}, function errorCallback(response) {
			console.log("connectie error");
		});
	}
}])

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
	$scope.userLoggedIn = true; // DEBUG MODE = true
	$scope.user = {};
	$scope.walkDetails = {};
	$scope.weatherForecast = "";
	$scope.movieDetails = {};
})
