(function () {
  'use strict';

  angular.module('finciero.svc.transactions')
  .factory('Transaction', function ($q) {
    var Transaction = {
      getData: function (perPage) {
        var transactions, $defer = $q.defer();

        transactions = [{
          date: '09/03/2015',
          description: 'Dummy description 1',
          movement: -8228,
          subCategory: 'Restaurantes',
          subAccount: {
            name: 'Cuenta Corriente',
            number: '*3008'

          },
          bankAccount: {
            name: 'Banco Chile'
          }
        }, {
          date: '09/03/2015',
          description: 'Dummy description 2',
          movement: -58228,
          subCategory: 'Regalos',
          subAccount: {
            name: 'Visa',
            number: '*2146'
          },
          bankAccount: {
            name: 'Banco Chile'
          }
        }, {
          date: '09/03/2015',
          description: 'Traspaso: ',
          movement: 2345678,
          subCategory: 'Traspaso Entre Cuentas',
          subAccount: {
            name: 'Cuenta Corriente',
            number: '*3008'
          },
          bankAccount: {
            name: 'Banco Chile'
          }
        }];

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
