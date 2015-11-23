(function () {
  'use strict';

  angular.module('finciero.cmp.newTransaction')
    .directive('finNewTransaction', function (Category, lodash, $mdDialog, $rootScope, $log, FlashMessage, CacheFactory, Transaction) {
      return {
        restrict: 'E',
        templateUrl: 'scripts/routes/transactions/_new-transaction/new-transaction.html',
        scope: {
          subAccountId: '='
        },
        link: function ($scope) {
          function sendForm () {
            var copy, formatted;

            copy = angular.copy($scope.newTransaction);
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
            copy.sub_account_id = $scope.subAccountId;
            formatted = lodash.pick(copy, ['charge', 'deposit', 'date', 'description', 'sub_category_id', 'sub_account_id']);

            Transaction.post({transaction: formatted}).then(function (data) {
              $rootScope.$emit('transactions:created', data);
              $mdDialog.hide();
              FlashMessage.show('La transacción ha sido creada con éxito.', true);
              CacheFactory.get('TransactionFactory').removeAll();
            }, function (err) {
              FlashMessage.show('Lo sentimos, pero ha ocurrido un error.', false);
              $log.error('new-transaction', '> when create new transaction', err);
            });
          }
          function cancelForm () {
            $mdDialog.hide();
          }

          $scope.newTransaction = {
            amount: 0,
            date: new Date()
          };

          Category.getList().then(function (data) {
            $scope.subCategories = data.subCategoriesList();
          });

          $scope.sendForm = sendForm;
          $scope.cancelForm = cancelForm;
        }
      };
    });

}());
