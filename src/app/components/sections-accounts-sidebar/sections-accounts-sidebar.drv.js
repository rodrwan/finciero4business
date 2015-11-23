(function () {
  'use strict';

  angular.module('finciero.cmp.sectionsAccountsSidebar')
    .directive('finSectionsAccountsSidebar', function ($mdDialog, BankAccount, $state, Setting, $rootScope, lodash, $moment, Socket) {
      return {
        templateUrl: 'scripts/components/sections-accounts-sidebar/sections-accounts-sidebar.html',
        restrict: 'E',
        replace: true,
        scope: {},
        link: function ($scope) {
          function disableLoading () {
            $scope.isLoadingScraping = false;
          }
          function updateAccounts () {
            $scope.isLoadingScraping = true;
            Setting.one().notifyScrape()
              .then(disableLoading(), disableLoading());
          }

          BankAccount.getList().then(function (bankAccounts) {
            $scope.bankAccounts = lodash.map(bankAccounts, function (bankAccount) {
              bankAccount.active = true;
              bankAccount.loading = false;
              bankAccount.subAccountsList = bankAccount.getAssetsLiabilitiesSubAccounts();
              return bankAccount;
            });
            $scope.isLoadingBankAccounts = false;
          });
          $scope.$state = $state;

          $scope.internationalCurrrency = function (data) {
            return data === 'international' ? 'Int.' : '';
          };

          $scope.toggleActiveBankAccount = function (bankAccount) {
            bankAccount.active = !bankAccount.active;
          };

          $scope.balanceColor = function (subAccount) {
            return subAccount.statement > 'asset' ? true : false;
          };

          $scope.showAddBankAccountDialog = function (ev) {
            $mdDialog.show({
              templateUrl: 'scripts/routes/bank-accounts/new-bank-account-dialog.html',
              clickOutsideToClose: true,
              targetEvent: ev
            });
          };

          $scope.bankAccounts = [];
          $scope.isLoadingScraping = false;
          $scope.isLoadingBankAccounts = true;
          $scope.updateAccounts = updateAccounts;

          if (!Socket.hasConnect()) {
            Socket.connect();
          }

          $rootScope.$on('bank-accounts:created', function (event, data) {
            var find = lodash.find($scope.bankAccounts, {id: data.id});

            if (angular.isUndefined(find)) {
              data.active = true;
              data.loading = true;
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
            console.log('sidebar:bank-accounts:updated');
            var newDatetime = $moment(data.updated_at);
            $scope.bankAccounts.some(function (bankAccount, index) {
              var currentDatetime;
              if (bankAccount.id === data.id) {
                currentDatetime = $moment(bankAccount.updated_at);

                if (newDatetime.isAfter(currentDatetime)) {
                  data.subAccountsList = data.getAssetsLiabilitiesSubAccounts();
                  lodash.merge($scope.bankAccounts[index], data);
                }
                return true;
              }
              return false;
            });
          });
        }
      };
    });

}());
