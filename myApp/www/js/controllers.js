var test =  "test";

angular.module('starter.controllers', [])

.controller('WwCtrl', function($scope) {})

.controller('AltCtrl', function($scope) {})

.controller('AltDetailCtrl', function($scope, $stateParams) {})

.controller('AccountCtrl', function($scope) {})

.controller('AppCtrl', function($scope) {
	$scope.init = function() {
		console.log(test);
	}
})
