(function () {
  'use strict';

  angular.module('finciero.business.rte.transactions')
    .controller('EditTransactionDialogCtrl', function ($scope, transactionLocals) {
      $scope.transaction = transactionLocals;
    });

}());
