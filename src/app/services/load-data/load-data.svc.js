(function () {
  'use strict';

  angular.module('finciero.svc.loadData')
    .factory('LoadData', function ($q, store) {
      var loadData = {
        initBankAccounts: function () {
          var $defer, bankAccounts;

          $defer = $q.defer();
          bankAccounts = [{
            id: 1,
            name: 'Cuenta Uso permanente',
            bank: 'Banco de Chile / Edwards Citi',
            subAccounts: [
              {
                id: 1,
                balance: 23000000,
                name: 'Cuenta Corriente',
                number: '3006',
                currency: 'national',
                statement: 'asset'
              },{
                id: 2,
                balance: 900000,
                name: 'Línea de crédito',
                number: '0707',
                currency: 'national',
                statement: 'liability'
              },{
                id: 3,
                balance: 650000,
                name: 'Visa',
                number: '2146',
                currency: 'national',
                statement: 'liability'
              }, {
                id: 4,
                balance: 10000,
                name: 'Visa',
                number: '2146',
                currency: 'international',
                statement: 'liability'
              }, {
                id: 5,
                balance: 23500,
                name: 'MasterCard',
                number: '1646',
                currency: 'national',
                statement: 'liability'
              }, {
                id: 6,
                balance: 17000,
                name: 'MasterCard',
                number: '1646',
                currency: 'international',
                statement: 'liability'
              }
            ]
          }];
          store.set('BankAccounts', bankAccounts);

          $defer.resolve('Data Loaded');
          return $defer.promise;
        },
        addNewBankAccount: function (name) {
          var $defer, bankAccouns, newBankAccouns;

          bankAccouns = store.get('BankAccounts');
          newBankAccouns = {
            id: 2,
            name: name,
            bank: 'Santander',
            subAccounts: [{
              id: 7,
              balance: 15768000,
              name: 'Cuenta Corriente',
              number: '7866',
              currency: 'national',
              statement: 'asset'
            }]
          };
          bankAccouns.push(newBankAccouns)
          store.set('BankAccounts', bankAccouns);

          $defer.resolve('Data Saved');
          return $defer.promise;
        }
      };

      return loadData;
    });
})();
