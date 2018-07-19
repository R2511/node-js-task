angular.module('app').factory('signupService', ['$q', '$http', function($q,$http) {

  return({
        signup:signup
          });

    function signup(data){
  	var deferred = $q.defer();
		$http.post('api/users/signUp', data, {
			headers : {
				'action' : 'signup'
			}
		})
        .success(function(data, status) {
            if (status === 200) {
              deferred.resolve(data);
            } else {
              deferred.reject(data);
            }
          })
        .error(function(data) {
          deferred.reject(data);
        });
        return deferred.promise;
      }
}]);







// app.controller('sinupController'),function($scope) {
//     $scope.data=$scope.signup();
//     var deferred = $q.defer();
//     $http.get($localStorage.baseURL + 'api/users/signUp' + data + '/redis', {
//           headers: {
//               'Authorization': $localStorage.accessToken
//           }
//       }).success(function(data, status) {
//             if (status === 204) {
//               deferred.resolve(data);
//             } else {
//               deferred.reject(data);
//             }
//       }).error(function(data) {
//           deferred.reject(data);
//       });
//             return deferred.promise;
//         }
//     }
