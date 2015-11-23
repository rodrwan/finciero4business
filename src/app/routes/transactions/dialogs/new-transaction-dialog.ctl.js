(function () {
  'use strict';

  angular.module('finciero.rte.transactions')
    .controller('NewTransactionDialogCtrl', function ($scope, subAccountLocals) {
      $scope.subAccountId = subAccountLocals.id;
    });

}());
