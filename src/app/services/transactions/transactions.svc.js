(function () {
  'use strict';

  angular.module('finciero.svc.transactions')
  .factory('Transaction', function ($q, store) {
    var Transaction = {
      getData: function (perPage) {
        var transactions, $defer = $q.defer();

        transactions = store.get('Transactions');

        if (typeof perPage === 'undefined') {
          setTimeout(function () {
            $defer.resolve(transactions);
          }, 2000);
        } else {
          setTimeout(function () {
            $defer.resolve(transactions.slice(0, perPage));
          }, 2000);
        }

        return $defer.promise;
      }
    };

    return Transaction;
  });

})();
