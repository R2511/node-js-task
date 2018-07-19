angular.module('app').controller('signupController', ['$state','signupService', '$window', '$rootScope', '$scope','$location', '$http','$q',
function( $state,signupService, $window, $rootScope, $scope, $location, $http, $q) {
		$scope.default=false;

		$scope.signup = function(data) {
			if ($scope.form.$valid) {
					$scope.default=false;
					signupService.signup(data).then(function(data) {
							console.log(data);
							$scope.isLoad = false;
						}).catch(function(data) {
							$scope.isLoad = false;
							if (data.error) {
							console.log($scope.data);
							} else {
								console.log(error);
							}
						});
			} else {
					$scope.default=true;
					console.log($scope.data);
			}
		};
}]);
























 	// $scope.signup = {id:'',email:'',user_name:'',password:'',role:''};
	//
  //   $scope.signUp = function (users) {
  //       signupService.post('signup', {
  //           users: users
  //       }).then(function (results) {
  //           signupService.toast(results);
  //           if (results.status == "success") {
  //               $location.path('dashboard');
  //           }
  //       });
	// 		};
 	// });

// $scope.signup = function(data) {
 //
 //     if (vm.formValidate.$valid) {
 //         vm.isSubmitted = false;
 //          signup(data);
 //     } else {
 //         vm.isSubmitted = true;
 //     }
	//  };
 //
 // function signup(data) {
 //     signupService.userRegistration(data).then(function(data) {
 //         if (data.status == 201) {
 //             $scope.isLoad = false;
 //             signupService.alertMessage('User registration', 'success', $alert)
 //             $state.go('login');
 //         } else {
 //             $scope.isLoad = false;
 //             signupService.alertMessage('User registration', 'error', $alert)
 //         }
 //     });
 // }
