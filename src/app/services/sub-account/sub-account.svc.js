(function () {
  'use strict';

  angular.module('finciero.svc.subAccount')
    .factory('SubAccount', function (store, lodash, BankAccount) {
      var BankAccounts, SubAccount;

      BankAccounts = store.get('BankAccounts');
      SubAccount = {
        getSubAccountsData: function (bankId, subAccountId) {
          return {
            name: BankAccounts[bankId-1].subAccounts[subAccountId-1].name,
            number: BankAccounts[bankId-1].subAccounts[subAccountId-1].number,
            currency: BankAccounts[bankId-1].subAccounts[subAccountId-1].currency,
          }
        }
      };

      return SubAccount;
    });

}());
