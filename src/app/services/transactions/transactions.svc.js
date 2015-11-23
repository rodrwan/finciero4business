(function () {
  'use strict';

  angular.module('finciero.svc.transactions')
  .factory('Transaction', function ($q) {
    var $deffer = $q.defer();

    var transactions = [{
      date: '09/03/2015',
      description: 'Dummy description 1',
      movement: -8228,
      subCategory: 'Restaurantes',
      sub_account: {
        name: 'Cuenta Corriente'
      }
    }, {
      date: '09/03/2015',
      description: 'Dummy description 2',
      movement: -58228,
      subCategory: 'Regalos',
      sub_account: {
        name: 'Visa'
      }
    }, {
      date: '09/03/2015',
      description: 'Traspaso: ',
      movement: 2345678,
      subCategory: 'Traspaso Entre Cuentas',
      sub_account: {
        name: 'Cuenta Corriente'
      }
    }];


    setTimeout(function () {
      $deffer.resolve(transactions);
    }, 2000);

    return $deffer.promise;
  });

})();
