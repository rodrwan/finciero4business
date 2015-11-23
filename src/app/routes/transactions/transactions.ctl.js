(function () {
  'use strict';

  angular
  	.module('finciero.business.rte.transactions')
    .controller('TransactionsCtrl', function ($scope, bankAccountResolve, transactionsResolve, $state, $stateParams) {
      function showIgnored () {
        var ignored = $scope.showAllIgnoredTransactions ? true : '';
        $state.go($state.current.name, {ignored: ignored});
      }

      $scope.bankAccounts = bankAccountResolve;
      $scope.transactions = transactionsResolve;
      $scope.showIgnored = showIgnored;

      if (angular.isDefined($stateParams.ignored)) {
        if ($stateParams.ignored === 'true') {
          $scope.showAllIgnoredTransactions = true;
        } else {
          $scope.showAllIgnoredTransactions = '';
        }
      } else {
        $scope.showAllIgnoredTransactions = '';
      }
    });

}());
