(function () {
  'use strict';

  angular.module('finciero.rte.logout', [
    'ui.router',
    'angular-storage'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    });
  });
})();
