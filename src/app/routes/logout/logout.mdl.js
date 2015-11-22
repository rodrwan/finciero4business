(function () {
  'use strict';

  angular.module('finciero.business.rte.logout', [
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
