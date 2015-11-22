(function () {
  'use strict';

  angular.module('finciero.business.rte.login', [
    'ui.router',
    'angular-storage',
    'finciero.business.login.drv.fbLoginForm'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'app/routes/login/login.html'
    });
  });
})();
