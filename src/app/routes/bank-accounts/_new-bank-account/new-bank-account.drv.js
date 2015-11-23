(function () {
  'use strict';

  angular.module('finciero.cmp.newBankAccount')
    .directive('finNewBankAccount', function (BankAccount, Bank, $log, $rootScope, lodash, $mdDialog, FlashMessage, RutHelper, Setting, $cacheFactory) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/bank-accounts/_new-bank-account/new-bank-account.html',
        replace: true,
        scope: {},
        link: function ($scope) {
          function disableLoading () {
            $scope.isLoading = false;
          }
          function sendForm () {
            var formatted;

            $scope.isLoading = true;
            $scope.newBankAccount.bank_id = $scope.newBankAccount.bank;
            $scope.newBankAccount.username = RutHelper.format($scope.newBankAccount.username);
            formatted = lodash.pick($scope.newBankAccount, ['bank_id', 'title', 'username', 'password']);

            BankAccount.post({bank_account: formatted})
              .then(function (data) {
                $rootScope.$emit('bank-accounts:created', data);
                $mdDialog.hide();
                $cacheFactory.get('$http').removeAll();
                FlashMessage.show('La cuenta bancaria ha sido creada con éxito.', true);
                Setting.one().notifyScrape()
                  .then(disableLoading(), disableLoading());
              }, function (err) {
                FlashMessage.show('Lo sentimos, pero ha ocurrido un error.', false);
                $scope.isLoading = false;
                $cacheFactory.get('$http').removeAll();
                $log.error('new-bank-account', '> when create new bank account', err);
              });
          }

          $scope.newBankAccount = {};
          $scope.banks = Bank.getList().$object;
          $scope.sendForm = sendForm;
        }
      };
    });

}());