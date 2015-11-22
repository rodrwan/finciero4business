(function () {
  'use strict';

  angular.module('finciero.business.rte.register', [
    'ui.router',
    'angular-storage'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('register', {
      url: '/register',
      controller: 'RegisterCtrl',
      templateUrl: 'app/routes/register/register.html'
    });
  });
})();
