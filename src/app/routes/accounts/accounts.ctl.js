(function () {
  'use strict';

  angular.module('finciero.rte.accounts')

  .controller('AccountsCtrl', function (FOREX, $mdDialog, $rootScope, $scope, BankAccount, lodash) {
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

    $scope.showAddBankAccountDialog = function (ev) {
      $mdDialog.show({
        templateUrl: 'app/routes/bank-accounts/new-bank-account-dialog.html',
        clickOutsideToClose: true,
        targetEvent: ev
      });
    };

    $rootScope.$on('bankAccount:created', function (event, data) {
      var find = lodash.find($scope.bankAccounts, {id: data.id});

      $scope.lastUpdate = store.get('lastUpdate');
      if (angular.isUndefined(find)) {
        data.active = true;
        data.loading = true;
        $scope.bankAccounts.push(data);
      }
    });
  });
})();
