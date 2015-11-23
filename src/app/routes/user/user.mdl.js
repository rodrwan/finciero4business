(function () {
  'use strict';

  angular.module('finciero.rte.user', [
    'finciero.cmp.bankAccount',
    'finciero.cmp.changeEmailForm',
    'finciero.cmp.changePasswordForm',
    'finciero.cmp.newBankAccount',
    'finciero.cmp.notification',
    'finciero.cmp.tabs',
    'finciero.svc.bankAccount',
    'finciero.svc.session',
    'finciero.svc.setting',
    'angular-momentjs',
    'ngLodash'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'app/routes/user/user.html',
        controller: 'UserCtrl',
        data: {
          requiresLogin: true
        }
      });
  });

}());
