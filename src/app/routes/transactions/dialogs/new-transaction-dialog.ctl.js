(function () {
  'use strict';

  angular.module('finciero.business.rte.transactions')
    .controller('NewTransactionDialogCtrl', function ($scope, subAccountLocals) {
      $scope.subAccountId = subAccountLocals.id;
    });

}());
