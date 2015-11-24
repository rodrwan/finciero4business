(function () {
  'use strict';

  angular.module('finciero.svc.bankAccount')
    .factory('BankAccount', function ($q, store, lodash, Bank, LoadData) {
      var BankAccount = {
        post: function (data) {
          LoadData.newUpdate();
          return LoadData.addNewBankAccount(data.title);
        },
        getData: function () {
          var fakeData, $deferred = $q.defer();

          fakeData = {
            getTotalIncomes: function () {
              return 2351043;
            },
            getTotalExpenses: function () {
              return 3351043;
            },
            getAvailable: function () {
              return 1000000;
            }
          };
          setTimeout(function () {
            $deferred.resolve(fakeData);
          }, 2000);

          return $deferred.promise;
        },
        getBankAccountList: function () {
          var List, $defer = $q.defer();

          List = store.get('BankAccounts');

          setTimeout(function () {
            $defer.resolve(List);
          }, 1000);

          return $defer.promise;
        },
        getBankAccountName: function (id) {
          var Banks = Bank;
          return Banks[id-1].name;
        }
      }

      return BankAccount;
    });

})();
