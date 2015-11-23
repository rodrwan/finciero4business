(function () {
  'use strict';

  angular.module('finciero.rte.bankAccounts')
    .directive('finBankAccountForm', function (BankAccount, Bank, $filter) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/bank-account/_form/form.html',
        scope: {},
        link: function ($scope) {
          var bankAccountData = {};
          var formatRutFilter = $filter('formatRut');
          $scope.bankAccount = bankAccountData;
          $scope.banks = Bank.getList().$object;

          $scope.submitForm = function () {
            var formatted = {
              'bank_account': {
                'title': bankAccountData.title,
                'username': formatRutFilter(bankAccountData.username),
                'password': bankAccountData.password,
                'bank_id': bankAccountData.bank.id
              }
            };
            BankAccount.post(formatted);
          };
        }
      };
    });

}());
