(function () {
  'use strict';

  angular.module('finciero.cmp.ignoreTransactionButton')
    .directive('finIgnoreTransactionButton', function ($rootScope, lodash, $log, CacheFactory) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/transactions/_transactions-table/_ignore-transaction-button/ignore-transaction-button.html',
        scope: {
          transaction: '='
        },
        link: function ($scope) {

          $scope.updateTransaction = angular.copy($scope.transaction);

          $scope.updateIgnoredTransaction = function () {
            var option = $scope.transaction.ignored ? 'unignore' : 'ignore';
            $scope.transaction.ignored = !$scope.transaction.ignored;

            $scope.updateTransaction.customPOST({}, option).then(function () {
              $rootScope.$emit('ignored-transaction:update', $scope.updateTransaction);
              CacheFactory.get('TransactionFactory').removeAll();
            }, function (err) {
              $scope.transaction.ignored = !$scope.transaction.ignored;
              $log.error('ignored-transaction.drv', '> update ignored transaction', err);
            });
          };
        }
      };
    });

}());
