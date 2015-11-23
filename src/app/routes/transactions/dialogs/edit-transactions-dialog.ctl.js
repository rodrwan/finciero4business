(function () {
  'use strict';

  angular.module('finciero.rte.transactions')
    .controller('EditTransactionDialogCtrl', function ($scope, transactionLocals) {
      $scope.transaction = transactionLocals;
    });

}());
