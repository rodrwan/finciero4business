(function () {
  'use strict';

  angular.module('finciero.dashboard.drv.fbMoneyIndicator')
  .directive('fbMoneyIndicator', function (FOREX, BankAccount, $mdMedia, $rootScope, lodash) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/dashboard/money-indicator/money-indicator.html',
        replace: true,
        scope: {},
        link: function ($scope, $element, $attrs) {
          function getTotalIncome(bankAccounts) {
            var subAccounts = [];
            bankAccounts.forEach(function(bankAccount) {
              subAccounts = subAccounts.concat(bankAccount.subAccounts);
            });

            var balance = lodash.reduce(subAccounts, function(result, subAccount) {
              if (subAccount.statement === 'asset' && subAccount.balance > 0) {
                if (subAccount.currency === 'international') {
                  result += subAccount.balance * FOREX;
                } else {
                  result += subAccount.balance;
                }
              }

              if (subAccount.statement === 'liability' && subAccount.balance < 0) {
                if (subAccount.currency === 'international') {
                  result -= subAccount.balance * FOREX;
                } else {
                  result -= subAccount.balance;
                }
              }

              return result;
            }, 0);

            return balance;
          }

          function getTotalExpenses(bankAccounts) {
            var subAccounts = [];
            bankAccounts.forEach(function(bankAccount) {
              subAccounts = subAccounts.concat(bankAccount.subAccounts);
            });

            var balance = lodash.reduce(subAccounts, function(result, subAccount) {
              if (subAccount.statement === 'liability' && subAccount.balance > 0) {
                if (subAccount.currency === 'international') {
                  result += subAccount.balance * FOREX;
                } else {
                  result += subAccount.balance;
                }
              }

              if (subAccount.statement === 'asset' && subAccount.balance < 0) {
                if (subAccount.currency === 'international') {
                  result -= subAccount.balance * FOREX;
                } else {
                  result -= subAccount.balance;
                }
              }

              return result;
            }, 0);

            return balance;
          }

          function getAvailable(bankAccounts) {
            return getTotalIncome(bankAccounts) - getTotalExpenses(bankAccounts);
          }

          function changeValues (bankAccounts) {

            var _money;
            if ($attrs.type === 'incomes') {
              _money = getTotalIncome(bankAccounts);
              $scope.sign = _money > 0 ? true : false;
              $scope.money = Math.abs(_money);
            } else if ($attrs.type === 'expenses') {
              $scope.money = getTotalExpenses(bankAccounts);
            } else if ($attrs.type === 'available') {
              $scope.money = getAvailable(bankAccounts);
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

          BankAccount.getBankAccountList()
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

          $rootScope.$on('bankAccount:created', function (event, data) {
            $scope.isLoading = true;
            BankAccount.getBankAccountList()
              .then(function (bankAccounts) {
                $scope.bankAccounts = bankAccounts;
                changeValues(bankAccounts);
                $scope.isLoading = false;
              });
          });

          $rootScope.$on('bankAccounts:updated', function (event, data) {
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
