(function () {
  'use strict';

  angular.module('finciero.cmp.editBankAccount')
    .directive('finEditBankAccount', function (BankAccount, Bank, $log, $rootScope, lodash, $mdDialog, FlashMessage, $cacheFactory, RutHelper) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/bank-accounts/_edit-bank-account/edit-bank-account.html',
        replace: true,
        scope: {
          bankAccount: '='
        },
        link: function ($scope) {
          function sendForm () {
            var formatted;

            $scope.editBankAccount.bank_id = $scope.editBankAccount.bank;
            $scope.editBankAccount.username = RutHelper.format($scope.editBankAccount.username);
            formatted = lodash.pick($scope.editBankAccount, ['bank_id', 'title', 'username', 'password']);

            $scope.editBankAccount.patch({bank_account: formatted})
              .then(function (data) {
                $rootScope.$emit('bank-accounts:updated', data);
                $mdDialog.hide();
                $cacheFactory.get('$http').removeAll();
                FlashMessage.show('La cuenta bancaria ha sido editada con éxito.', true);
              }, function (err) {
                FlashMessage.show('Lo sentimos, pero ha ocurrido un error.', false);
                $log.error('edit-bank-account', '> when edit bank account', err);
              });
          }

          $scope.editBankAccount = angular.copy($scope.bankAccount);
          $scope.editBankAccount.bank = $scope.editBankAccount.bank.id;

          $scope.sendForm = sendForm;
          $scope.banks = Bank.getList().$object;
        }
      };
    });

}());
