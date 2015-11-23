(function () {
  'use strict';

  angular.module('finciero.rte.bankAccounts')
    .controller('BankAccountsTransactionsCtrl', function ($scope, bankAccountResolve, transactionsResolve) {

      $scope.bankAccount = bankAccountResolve;
      $scope.transactions = transactionsResolve;

    });

}());
