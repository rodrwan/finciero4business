(function () {
  'use strict';

  angular.module('finciero.rte.bankAccounts')
    .controller('EditBankAccountDialogCtrl', function ($scope, bankAccountLocals) {
      $scope.bankAccount = bankAccountLocals;
    });

}());
