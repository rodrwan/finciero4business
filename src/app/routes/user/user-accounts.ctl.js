(function () {
  'use strict';

  angular.module('finciero.business.rte.user')
    .controller('UserAccountsCtrl', function ($scope, BankAccountsResolve, $mdDialog, $rootScope, lodash, $moment) {
      function showAddDialog (ev) {
        $mdDialog.show({
          templateUrl: 'scripts/routes/bank-accounts/new-bank-account-dialog.html',
          clickOutsideToClose: true,
          targetEvent: ev
        });
      }

      $scope.bankAccounts = BankAccountsResolve;
      $scope.showAddDialog = showAddDialog;

      $rootScope.$on('bank-accounts:created', function (event, data) {
        var find = lodash.find($scope.bankAccounts, {id: data.id});

        if (angular.isUndefined(find)) {
          $scope.bankAccounts.push(data);
        }
      });

      $rootScope.$on('bank-accounts:destroyed', function (event, data) {
        $scope.bankAccounts.some(function (bankAccount, index) {
          if (bankAccount.id === data.id) {
            $scope.bankAccounts.splice(index, 1);
            return true;
          }
          return false;
        });
      });

      $rootScope.$on('bank-accounts:updated', function (event, data) {
        var newDatetime = $moment(data.updated_at);
        $scope.bankAccounts.some(function (bankAccount, index) {
          var currentDatetime;
          if (bankAccount.id === data.id) {
            currentDatetime = $moment(bankAccount.updated_at);

            if (newDatetime.isAfter(currentDatetime)) {
              lodash.merge($scope.bankAccounts[index], data);
            }
            return true;
          }
          return false;
        });
      });

    });

}());
