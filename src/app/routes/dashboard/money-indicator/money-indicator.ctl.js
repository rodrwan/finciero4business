(function () {
  'use strict';

  angular.module('finciero.dashboard.drv.fbMoneyIndicator')
  .directive('fbMoneyIndicator', function (BankAccount, $mdMedia, $rootScope) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/dashboard/money-indicator/money-indicator.html',
        replace: true,
        scope: {},
        link: function ($scope, $element, $attrs) {
          function changeValues (bankAccounts) {
            var _money;
            if ($attrs.type === 'incomes') {
              _money = bankAccounts.getTotalIncomes();
              $scope.sign = _money > 0 ? true : false;
              $scope.money = Math.abs(_money);
            } else if ($attrs.type === 'expenses') {
              $scope.money = bankAccounts.getTotalExpenses();
            } else if ($attrs.type === 'available') {
              $scope.money = bankAccounts.getAvailable();
            }

            $scope.isLoading = false;
          }
          function isOfType (type) {
            return type === $attrs.type ? true : false;
          }

          $scope.money = 0;
          $scope.type = $attrs.type;
          $scope.$mdMedia = $mdMedia;
          $scope.isOfType = isOfType;
          $scope.isLoading = true;

          BankAccount
            .then(function (bankAccounts) {
              $scope.bankAccounts = bankAccounts;
              changeValues(bankAccounts);
            });

          if ($attrs.type === 'incomes') {
            $scope.title = 'Ingresos';
            $scope.subTitle = 'Tus cuentas bancarias';
          } else if ($attrs.type === 'expenses') {
            $scope.title = 'Gastos';
            $scope.subTitle = 'Todas tus cuentas';
          } else if ($attrs.type === 'available') {
            $scope.title = 'Disponible';
            $scope.subTitle = 'Lo que tienes';
          }

          $rootScope.$on('bank-accounts:updated', function (event, data) {
            $scope.isLoading = true;

            if (data.status === 'success') {
              BankAccount
                .then(function (bankAccounts) {
                  $scope.bankAccounts = bankAccounts;
                  changeValues(bankAccounts);
                });
            }
          });
        }
      };
    });

}());
