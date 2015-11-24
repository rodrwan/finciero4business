(function () {
  'use strict';

  angular.module('finciero.svc.bankAccount')
    .factory('BankAccount', function ($q, store, lodash) {
      var BankAccount = {
        post: function (data) {

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
          var BankAccounts = store.get('BankAccounts');
          return BankAccounts[id-1].bank;
        }
      }

      return BankAccount;
    });

})();
