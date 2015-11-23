(function () {
  'use strict';

  angular.module('finciero.cmp.chartFilterSelectSubAccounts')
    .directive('finChartFilterSelectSubAccounts', function (lodash, ChartFilterList) {
      return {
        templateUrl: 'scripts/components/chart-filter/_select-sub-accounts/chart-filter-select-sub-accounts.html',
        restrict: 'E',
        replace: true,
        scope: {
          subAccounts: '='
        },
        link: function ($scope, $element, $attrs) {
          var filterName, filter;

          function setOptions () {
            var idsArray = [];

            idsArray = lodash.filter($scope.subAccountsList, {active: true});
            idsArray = lodash.map(idsArray, function (data) {
              return data.id;
            });
            filter.setOptions({'sub_account_ids[]': idsArray});
          }

          function sendOptions () {
            filter.refreshChartValues();
          }

          function send () {
            setOptions();
            sendOptions();
          }

          function changeCheckbox (data) {
            if (data.active) {
              $scope.subAccounts.push(data.id);
            } else {
              lodash.remove($scope.subAccounts, function (id) {
                if (id === data.id) {
                  return true;
                }
                return false;
              });
            }
          }

          function getActives () {
            return lodash.reduce($scope.subAccountsList, function (sum, subAccount) {
              if (subAccount.active) {
                return sum + 1;
              }
              return sum;
            }, 0);
          }

          function selectAll () {
            $scope.subAccountsList = lodash.map($scope.subAccountsList, function (subAccount) {
              if (!subAccount.active) {
                subAccount.active = !subAccount.active;
              }
              return subAccount;
            });
          }

          function deselectAll () {
            $scope.subAccountsList = lodash.map($scope.subAccountsList, function (subAccount) {
              subAccount.active = !subAccount.active;
              return subAccount;
            });
          }

          function toggleSelection () {
            if (getActives() === $scope.subAccountsList.length) {
              deselectAll();
            } else {
              selectAll();
            }
          }

          filterName = $attrs.filterName;
          filter = ChartFilterList.get(filterName);

          $scope.subAccountsList = lodash.map($scope.subAccounts, function (subAccount) {
            $scope.subAccounts.push(subAccount.id);
            return lodash.assign(subAccount, {active: true});
          });

          $scope.changeCheckbox = changeCheckbox;
          $scope.getActives = getActives;
          $scope.toggleSelection = toggleSelection;
          $scope.send = send;

          setOptions();

          // TODO: find bes solution using promises pattern
          sendOptions();
        }
      };
    });

}());
