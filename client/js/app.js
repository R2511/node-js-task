// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'signupController'
      });


    $urlRouterProvider.otherwise('signup');
  }]);
  // .run(['$rootScope', '$state', 'LoopBackAuth', 'AuthService', function($rootScope, $state, LoopBackAuth, AuthService) {
  //   $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
  //
  //     if (toState.authenticate && !LoopBackAuth.accessTokenId) {
  //       event.preventDefault();
  //       $rootScope.returnTo = {
  //         state: toState,
  //         params: toParams
  //       };
  //     }
  //   });
  //
  //   // Get data from localstorage after pagerefresh
  //   // and load user data into rootscope.
  //   if (LoopBackAuth.accessTokenId && !$rootScope.currentUser) {
  //     AuthService.refresh(LoopBackAuth.accessTokenId);
  //   }
  // }]);
