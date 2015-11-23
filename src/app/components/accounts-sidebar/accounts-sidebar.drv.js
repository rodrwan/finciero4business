(function () {
  'use strict';

  angular.module('finciero.cmp.accountsSidebar')
    .directive('finAccountsSidebar', function (BankAccount) {
      return {
        templateUrl: 'scripts/components/accounts-sidebar/accounts-sidebar.html',
        restrict: 'E',
        scope: {},
        replace: true,
        link: function ($scope) {
          $scope.bankAccounts = BankAccount.getList().$object;

          $scope.internationalCurrrency = function (data) {
            return data === 'international' ? 'Int.' : '';
          };
        }
      };
    });

}());
