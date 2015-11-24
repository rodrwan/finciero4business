(function () {
  'use strict';

  angular.module('finciero.rte.accounts', [
    'ui.router',
    'angular-storage',
    'finciero.drv.fbMenu',
    'finciero.cmp.bankAccount',
    'finciero.svc.bankAccount',
    'ngLodash'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('accounts', {
      url: '/accounts',
      controller: 'AccountsCtrl',
      templateUrl: 'app/routes/accounts/accounts.html',
      data: {
        requiresLogin: true
      }
    });
  });
})();
