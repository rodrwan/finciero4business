(function () {
  'use strict';

  angular.module('finciero.rte.accounts')

  .controller('AccountsCtrl', function (FOREX, $mdDialog, $scope, BankAccount, lodash) {
    function showAddDialog (ev) {
      $mdDialog.show({
        templateUrl: 'app/routes/bank-accounts/new-bank-account-dialog.html',
        clickOutsideToClose: true,
        targetEvent: ev
      });
    }
    $scope.isLoading = true;
    BankAccount.getBankAccountList().then(function (bankAccounts) {
      $scope.bankAccounts = bankAccounts;
      $scope.isLoading = false;
    });

    $scope.getBankAccountBalance = function (subAccounts) {
      var balance = lodash.reduce(subAccounts, function(result, subAccount) {
        if (subAccount.statement === 'asset') {
          if (subAccount.currency === 'international') {
            result += subAccount.balance * FOREX;
          } else {
            result += subAccount.balance;
          }
        } else {
          if (subAccount.currency === 'international') {
            result -= subAccount.balance * FOREX;
          } else {
            result -= subAccount.balance;
          }
        }

        return result;
      }, 0);

      return balance;
    };
  });
})();
