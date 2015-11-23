(function () {
  'use strict';

  angular.module('finciero.cmp.editTransaction')
    .directive('finEditTransaction', function (Category, lodash, $mdDialog, $rootScope, $log, FlashMessage, CacheFactory) {
      return {
        restrict: 'E',
        templateUrl: 'scripts/routes/transactions/_edit-transaction/edit-transaction.html',
        scope: {
          transaction: '='
        },
        link: function ($scope) {
          var editTransaction;

          function sendForm () {
            var copy, formatted;

            copy = angular.copy($scope.editTransaction);
            copy.amount = Math.abs(copy.amount);
            if (copy.type === 'charge') {
              copy.charge = copy.amount;
              copy.deposit = 0;
            } else {
              copy.deposit = copy.amount;
              copy.charge = 0;
            }

            copy.sub_category_id = copy.subCategorySelectedId;
            copy.date = moment(copy.date).format('YYYY-MM-DD');
            formatted = lodash.pick(copy, ['charge', 'deposit', 'date', 'description', 'sub_category_id', 'sub_account_id']);

            $scope.transaction.patch({transaction: copy}).then(function (data) {
              $rootScope.$emit('transactions:updated', data);
              $mdDialog.hide();
              FlashMessage.show('La transacción ha sido editada con éxito.', true);
              CacheFactory.get('TransactionFactory').removeAll();
            }, function (err) {
              FlashMessage.show('Lo sentimos, pero ha ocurrido un error.', false);
              $log.error('edit-transaction', '> when update transaction', err);
            });
          }
          function cancelForm () {
            $mdDialog.hide();
          }

          editTransaction = angular.copy($scope.transaction);
          editTransaction.date = moment(editTransaction.date, 'YYYY-MM-DD').toDate();
          editTransaction.subCategorySelectedId = editTransaction.sub_category_id;
          
          if (editTransaction.charge === 0) {
            editTransaction.amount = editTransaction.deposit;
            editTransaction.type = 'deposit';
          } else {
            editTransaction.amount = editTransaction.charge;
            editTransaction.type = 'charge';
          }

          Category.getList().then(function (data) {
            $scope.subCategories = data.subCategoriesList();
          });

          $scope.editTransaction = editTransaction;
          $scope.sendForm = sendForm;
          $scope.cancelForm = cancelForm;
        }
      };
    });

}());
