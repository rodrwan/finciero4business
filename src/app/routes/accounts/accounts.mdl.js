(function () {
  'use strict';

  angular.module('finciero.business.rte.accounts', [
    'ui.router',
    'angular-storage',
    'finciero.business.drv.fbMenu',
    'finciero.cmp.bankAccount'
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
