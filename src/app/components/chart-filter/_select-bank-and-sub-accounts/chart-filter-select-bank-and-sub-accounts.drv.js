(function () {
  'use strict';

  angular.module('finciero.cmp.chartFilterSelectBankAndSubAccounts')
    .directive('finChartFilterSelectBankAndSubAccounts', function (lodash, ChartFilterList) {
      return {
        templateUrl: 'scripts/components/chart-filter/_select-bank-and-sub-accounts/chart-filter-select-bank-and-sub-accounts.html',
        restrict: 'E',
        replace: true,
        scope: {
          bankAccounts: '='
        },
        link: function ($scope, $element, $attrs) {
          var filterName, filter, totalSubAccounts = 0;

          function setOptions () {
            var idsArray = lodash.reduce($scope.bankAccountList, function (array, bankAccount) {
              return lodash.reduce(bankAccount.subAccounts, function (arr, subAccount) {
                if (subAccount.selected) {
                  arr.push(subAccount.id);
                }
                return arr;
              }, array);
            }, []);

            filter.setOptions({'sub_account_ids[]': idsArray});
          }

          function sendOptions () {
            filter.refreshChartValues();
          }

          function send () {
            setOptions();
            sendOptions();
          }

          function getSubAccountActivesInBankAccount (bankAccount) {
            return lodash.reduce(bankAccount.subAccounts, function (sum, subAccount) {
              return subAccount.selected ? sum + 1 : sum;
            }, 0);
          }

          function bankAccountSelection (bankAccount) {
            var condition = (bankAccount.subAccounts.length === getSubAccountActivesInBankAccount(bankAccount)) ? false : true;

            bankAccount.subAccounts = lodash.map(bankAccount.subAccounts, function (subAccount) {
              subAccount.selected = condition;
              return subAccount;
            });
          }

          function getTotalActives () {
            return lodash.reduce($scope.bankAccountList, function (sum, bankAccount) {
              return lodash.reduce(bankAccount.subAccounts, function (s, subAccount) {
                return subAccount.selected ? s + 1 : s;
              }, sum);
            }, 0);
          }

          function allAccounts (active) {
            $scope.bankAccountList = lodash.map($scope.bankAccountList, function (bankAccount) {
              bankAccount.selected = active;
              bankAccount.subAccounts = lodash.map(bankAccount.subAccounts, function (subAccount) {
                subAccount.selected = active;
                return subAccount;
              });
              return bankAccount;
            });
          }

          function toggleSelection () {
            if (getTotalActives() === totalSubAccounts) {
              allAccounts(false);
            } else {
              allAccounts(true);
            }
          }

          filterName = $attrs.filterName;
          filter = ChartFilterList.get(filterName);

          $scope.bankAccountList = lodash.reduce($scope.bankAccounts, function (bankAccounts, bankAccount) {
            var ba = {
              id: bankAccount.id,
              title: bankAccount.title,
              selected: true,
              subAccounts: lodash.reduce(bankAccount.sub_accounts, function (subAccounts, subAccount) {
                var sa = {
                  id: subAccount.id,
                  bankAccountId: subAccount.bank_account_id,
                  name: subAccount.name,
                  selected: true
                };
                subAccounts.push(sa);
                totalSubAccounts++;
                return subAccounts;
              }, [])
            };
            bankAccounts.push(ba);
            return bankAccounts;
          }, []);

          $scope.bankAccountSelection = bankAccountSelection;
          $scope.getTotalActives = getTotalActives;
          $scope.toggleSelection = toggleSelection;
          $scope.send = send;

          setOptions();
          sendOptions();
        }
      };
    });

}());
