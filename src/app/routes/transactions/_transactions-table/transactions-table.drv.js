(function () {
  'use strict';

  angular.module('finciero.cmp.transactionsTable')
    .directive('finTransactionsTable', function ($log, $rootScope, $mdDialog, Category, lodash, BankAccount, SubAccount) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/transactions/_transactions-table/transactions-table.html',
        scope: {
          transactions: '=',
          showSort: '=?',
          showPagination: '=?',
          searchByDescription: '=?'
        },
        link: function ($scope, $element, $attrs) {
          var showPagination, sortOptions;
          // pre-processing data.
          $scope.transactions = $scope.transactions.sort(function(a, b) {
            return moment(b.date, 'DD/MM/YYYY').toDate() - moment(a.date, 'DD/MM/YYYY').toDate();
          });

          $scope.transactions = lodash.map($scope.transactions, function (transaction) {
            transaction.bankAccount = {};
            transaction.bankAccount.name = BankAccount.getBankAccountName(transaction.subAccount.bankAccountId);
            transaction.subAccountData = SubAccount.getSubAccountsData(
              transaction.subAccount.bankAccountId,
              transaction.subAccount.id
            );
            return transaction;
          });

          function parseDate (transaction) {
            var today, yesterday, formatDate, returnVal;

            today = moment(new Date()).format('DD/MM/YYYY');
            yesterday = moment(new Date()).subtract(1, 'day').format('DD/MM/YYYY');
            // formatDate = moment(transaction.date, 'YYYY-MM-DD').format('DD/MM/YYYY');
            formatDate = moment(transaction.date, 'DD/MM/YYYY').format('DD/MM/YYYY');

            if (formatDate === today) {
              returnVal = 'Hoy';
            } else if (formatDate === yesterday) {
              returnVal = 'Ayer';
            } else {
              returnVal = formatDate;
            }
            return returnVal;
          }
          function transactionsIsEmpty () {
            return $scope.transactions.length === 0 ? true : false;
          }
          function showEditTransactionDialog (transaction, ev) {
            $mdDialog.show({
              templateUrl: 'app/routes/transactions/dialogs/edit-transaction-dialog.html',
              clickOutsideToClose: true,
              controller: 'EditTransactionDialogCtrl',
              targetEvent: ev,
              locals: {
                transactionLocals: transaction
              }
            });
          }
          function removeTransaction (transaction, ev) {
            var confirm = $mdDialog.confirm()
              .title('¿Estás seguro?')
              .content('Los cambios realizados serán irreversibles')
              .ok('Si')
              .cancel('No')
              .targetEvent(ev);

            $mdDialog.show(confirm)
              .then(function () {
                transaction.remove()
                  .then(function () {
                    $rootScope.$emit('transactions:removed', transaction);
                  }, function (err) {
                    $log.error('transactions-table', '> when remove transaction', err);
                  });
              });
          }
          function internationalCurrency (data) {
            return data === 'international' ? 'Int.' : '';
          }

          if (angular.isUndefined($scope.showSort)) {
            $scope.showSort = false;
          }

          if (angular.isUndefined($scope.showPagination)) {
            $scope.showPagination = false;
          }

          if (angular.isUndefined($scope.searchByDescription)) {
            $scope.searchByDescription = true;
          }

          if (!lodash.isBoolean($scope.showSort)) {
            throw new Error('Invalid showSort directive param: ' + $scope.showSort);
          }

          if (!lodash.isBoolean($scope.showPagination)) {
            throw new Error('Invalid showPagination directive param: ' + $scope.showPagination);
          }

          if (!lodash.isBoolean($scope.searchByDescription)) {
            throw new Error('Invalid searchByDescription directive param: ' + $scope.searchByDescription);
          }

          Category.then(function (data) {
            $scope.subCategories = data;
          });

          sortOptions = {
            date: {
              column: 'date',
              name: 'fecha'
            },
            description: {
              column: 'description',
              name: 'descripción'
            },
            movement: {
              column: 'movement',
              name: 'movimiento'
            }
          };

          $scope.parseDate = parseDate;
          $scope.transactionsIsEmpty = transactionsIsEmpty;
          $scope.showEditTransactionDialog = showEditTransactionDialog;
          $scope.removeTransaction = removeTransaction;
          $scope.sortOptions = sortOptions;
          $scope.internationalCurrency = internationalCurrency;
          $scope.showSearch = false;

          $rootScope.$on('transactions:created', function (event, data) {
            $scope.transactions.unshift(data);
          });
          $rootScope.$on('transactions:removed', function (event, data) {
            $scope.transactions.some(function (transaction, index) {
              if (transaction.id === data.id) {
                $scope.transactions.splice(index, 1);
                return true;
              }
              return false;
            });
          });
          $rootScope.$on('transactions:updated', function (event, data) {
            $scope.transactions.some(function (transaction, index) {
              if (transaction.id === data.id) {
                angular.extend($scope.transactions[index], data);
                return true;
              }
              return false;
            });
          });
        }
      };
    });

}());
