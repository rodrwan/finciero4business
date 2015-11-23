(function () {
  'use strict';

  angular.module('finciero.rte.login', [
    'ui.router',
    'angular-storage',
    'finciero.login.drv.fbLoginForm'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'app/routes/login/login.html'
    });
  });
})();
