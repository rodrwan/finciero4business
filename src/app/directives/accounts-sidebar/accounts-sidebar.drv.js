(function () {
  'use strict';

  angular.module('finciero.business.drv.accountsSidebar')
    .directive('fbAccountsSidebar', function ($mdDialog, BankAccount, $state, $rootScope, lodash, Restangular) {
      return {
        templateUrl: 'app/directives/accounts-sidebar/accounts-sidebar.html',
        restrict: 'E',
        replace: true,
        scope: {},
        link: function ($scope) {
          function disableLoading () {
            $scope.isLoadingScraping = false;
          }
          function updateAccounts () {
            $scope.isLoadingScraping = true;
            Setting.one('').notifyScrape()
              .then(disableLoading(), disableLoading());
          }
          function showBankAccountDialog (ev, bankAccount) {
            $mdDialog.show({
              templateUrl: 'app/routes/bank-accounts/bank-account-dialog.html',
              clickOutsideToClose: true,
              targetEvent: ev,
              controller: 'BankAccountDialogCtrl',
              locals: {
                bankAccountLocals: bankAccount
              }
            });
          }
          function showliquidateInvestmentDialog (ev, subAccount) {
            var restangularizeElement = Restangular.restangularizeElement(null, subAccount.investment, 'investments');
            ev.stopPropagation();

            $mdDialog.show({
              templateUrl: 'scripts/routes/investments/liquidate-investment-dialog.html',
              targetEvent: ev,
              controller: 'LiquidateInvestmentDialogCtrl',
              clickOutsideToClose: true,
              locals: {
                investmentLocals: restangularizeElement
              }
            });
          }
          function parseDate (date) {
            return $moment(date).fromNow();
          }

          // BankAccount.getList().then(function (bankAccounts) {
          //   $scope.bankAccounts = lodash.map(bankAccounts, function (bankAccount) {
          //     bankAccount.active = true;
          //     bankAccount.loading = false;
          //     bankAccount.subAccountsList = bankAccount.getAssetsLiabilitiesSubAccounts();
          //      remove liquidated investments
          //     if (bankAccount.is_investment_account) {
          //       lodash.remove(bankAccount.subAccountsList, function (subAccount) {
          //         return subAccount.investment.liquidated;
          //       });
          //     }
          //     return bankAccount;
          //   });
          //   $scope.isLoadingBankAccounts = false;
          // });
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
              templateUrl: 'app/routes/bank-accounts/new-bank-account-dialog.html',
              clickOutsideToClose: true,
              targetEvent: ev
            });
          };

          $scope.bankAccounts = [];
          $scope.isLoadingScraping = false;
          $scope.isLoadingBankAccounts = true;
          $scope.updateAccounts = updateAccounts;
          $scope.showBankAccountDialog = showBankAccountDialog;
          $scope.showliquidateInvestmentDialog = showliquidateInvestmentDialog;
          $scope.parseDate = parseDate;

          // if (!Socket.hasConnection()) {
          //   Socket.connect();
          // }

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
            var newDatetime = $moment(data.updated_at);
            $scope.bankAccounts.some(function (bankAccount, index) {
              var currentDatetime;
              if (bankAccount.id === data.id) {
                currentDatetime = $moment(bankAccount.updated_at);

                if (newDatetime.isAfter(currentDatetime)) {
                  data.subAccountsList = data.getAssetsLiabilitiesSubAccounts();
                  /* remove liquidated investments */
                  if (data.is_investment_account) {
                    lodash.remove(data.subAccountsList, function (subAccount) {
                      return subAccount.investment.liquidated;
                    });
                  }
                  lodash.merge($scope.bankAccounts[index], data);
                }
                return true;
              }
              return false;
            });
          });

          $rootScope.$on('investments:updated', function (event, data) {
            $scope.bankAccounts.some(function (bankAccount, baIndex) {
              if (bankAccount.is_investment_account) {
                lodash.remove(bankAccount.subAccountsList, function (subAccount) {
                  return subAccount.investment.id === data.id;
                });
                return true;
              }
              return false;
            });
          });
        }
      };
    });

}());
