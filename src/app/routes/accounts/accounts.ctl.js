(function () {
  'use strict';

  angular.module('finciero.business.rte.accounts')

  .controller('AccountsCtrl', function HomeController ($mdDialog, $scope) {
    function showAddDialog (ev) {
      $mdDialog.show({
        templateUrl: 'app/routes/bank-accounts/new-bank-account-dialog.html',
        clickOutsideToClose: true,
        targetEvent: ev
      });
    }

    $scope.bankAccounts = [{
      bank: {
        name: 'Banco de Chile'
      },
      subAccounts: [{
        name: 'Cuenta Corriente',
        balance: 120000
      }, {
        name: 'Visa',
        balance: 580000
      }, {
        name: 'MasterCard',
        balance: 40000
      }]
    }];
  });
})();
