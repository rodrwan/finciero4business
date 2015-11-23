(function () {
  'use strict';

  angular.module('finciero.svc.bankAccount')
    .factory('BankAccount', function ($q) {
      var $deferred = $q.defer();
      var fakeData = {
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

      return  $deferred.promise
    });

})();
