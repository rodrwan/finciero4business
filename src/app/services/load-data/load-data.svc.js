(function () {
  'use strict';

  angular.module('finciero.svc.loadData')
    .factory('LoadData', function ($rootScope, $q, store) {
      var loadData = {
        initBankAccounts: function () {
          var $defer, bankAccounts, transactions;

          $defer = $q.defer();
          transactions = [{
            date: '6/11/2015',
            description: 'Boleta 137 - diseñador',
            movement: -157500,
            subCategory: 'Marketing',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '10/11/2015',
            description: 'Imposiciones Octubre',
            movement: -874125,
            subCategory: 'Impuestos',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '5/11/2015',
            description: 'Arriendo Of 1304',
            movement: -735640,
            subCategory: 'Arriendo',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '12/11/2015',
            description: 'Marketing - Fact. 4142',
            movement: -528626,
            subCategory: 'Marketing',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '13/11/2015',
            description: 'Vimeo.com compras int.ma',
            movement: -59.95,
            subCategory: 'Tecnología',
            subAccount: {
              id: 4,
              bankAccountId: 1
            }
          },{
            date: '3/11/2015',
            description: 'Amazon web services compras int.ma',
            movement: -38394,
            subCategory: 'Tecnología',
            subAccount: {
              id: 5,
              bankAccountId: 1
            }
          },{
            date: '7/11/2015',
            description: 'Chilectra Internet',
            movement: -33245,
            subCategory: 'Electricidad',
            subAccount: {
              id: 5,
              bankAccountId: 1
            }
          },{
            date: '10/11/2015',
            description: 'Aguas Andinas Santiago',
            movement: -3948,
            subCategory: 'Agua',
            subAccount: {
              id: 3,
              bankAccountId: 1
            }
          },{
            date: '16/11/2015',
            description: 'Mailchimp compras int.ma',
            movement: -10,
            subCategory: 'Tecnología',
            subAccount: {
              id: 6,
              bankAccountId: 1
            }
          },{
            date: '4/11/2015',
            description: 'Facebk *fqudp8nne2 compras int.ma',
            movement: -7234,
            subCategory: 'Marketing',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '9/11/2015',
            description: 'GOOGLE*ADWS3253666418',
            movement: -147290,
            subCategory: 'Marketing',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '3/11/2015',
            description: 'Depósito Documento Mismo Banco',
            movement: 349000,
            subCategory: 'Ingresos',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '3/11/2015',
            description: 'Depósito Documento Otros Bancos',
            movement: 147500,
            subCategory: 'Ingresos',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '3/11/2015',
            description: 'Factua 358. Landing',
            movement: -119000,
            subCategory: 'Tecnología',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '12/11/2015',
            description: 'Transferencia Banco Santander',
            movement: 249990,
            subCategory: 'Ingresos',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '10/11/2015',
            description: 'Factura #437',
            movement: 1897450,
            subCategory: 'Ingresos',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '12/11/2015',
            description: 'Trans. banco de chile/edwards',
            movement: 489345,
            subCategory: 'Ingresos',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          },{
            date: '16/11/2015',
            description: 'Pago Factura Nro 429',
            movement: 159000,
            subCategory: 'Ingresos',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          }, {
            date: '5/11/2015',
            description: 'Gastos Comunes Oct.',
            movement: -89000,
            subCategory: 'Gastos Comunes',
            subAccount: {
              id: 1,
              bankAccountId: 1
            }
          }];
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
          store.set('Transactions', transactions);
          $defer.resolve('Data Loaded');
          return $defer.promise;
        },
        addNewBankAccount: function (name) {
          var $defer, bankAccouns, newBankAccounts;

          $defer = $q.defer();
          bankAccouns = store.get('BankAccounts');
          newBankAccounts = {
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
          console.log(newBankAccounts)
          bankAccouns.push(newBankAccounts)
          store.set('BankAccounts', bankAccouns);
          console.log('new bank account added.');
          $defer.resolve('Data Saved');
          return $defer.promise;
        },
        initTransactions: function () {

        }
      };

      return loadData;
    });
})();
