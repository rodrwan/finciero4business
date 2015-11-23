(function () {
  'use strict';

  angular.module('finciero.cmp.bankAccount')
    .directive('finBankAccount', function ($log, $rootScope, $mdDialog, FlashMessage) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/bank-accounts/_bank-account/bank-account.html',
        replace: true,
        scope: {
          bankAccount: '='
        },
        link: function ($scope) {

          $scope.showEditDialog = function (ev) {
            $mdDialog.show({
              templateUrl: 'app/routes/bank-accounts/edit-bank-account-dialog.html',
              targetEvent: ev,
              controller: 'EditBankAccountDialogCtrl',
              clickOutsideToClose: true,
              locals: {
                bankAccountLocals: $scope.bankAccount
              }
            });
          };

          $scope.showRemoveDialog = function (ev) {
            var bankAccount, confirm;

            bankAccount = $scope.bankAccount;
            confirm = $mdDialog.confirm()
              .title('¿Estás seguro?')
              .content('Los cambios realizados serán irreversibles')
              .ok('Si')
              .cancel('No')
              .targetEvent(ev);

            $mdDialog.show(confirm)
              .then(function () {
                $rootScope.$emit('bank-accounts:destroyed', bankAccount);
                return bankAccount.remove();
              })
              .then(function () {
                FlashMessage.show('La cuenta bancaria fue removida con éxito.', true);
              }, function (err) {
                $rootScope.$emit('bank-accounts:created', bankAccount);
                $log.error('bank-account:remove', '> when remove a bank account', err);
              });
          };

        }
      };
    });

}());
