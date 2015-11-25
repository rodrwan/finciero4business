(function () {
  'use strict';

  angular.module('finciero.svc.bank')
    .factory('Bank', function () {
      var Bank = [{
        "id": 1,
        "name": "Banco de Chile / Edwards Citi"
      },
      {
        "id": 2,
        "name": "Santander"
      },
      {
        "id": 7,
        "name": "Banefe"
      },
      {
        "id": 10,
        "name": "Scotiabank"
      },
      {
        "id": 13,
        "name": "Banco Security"
      },
      {
        "id": 14,
        "name": "Banco Internacional"
      },
      {
        "id": 15,
        "name": "Rabobank"
      },
      {
        "id": 16,
        "name": "HSBC Bank"
      },
      {
        "id": 17,
        "name": "Banco Ripley"
      },
      {
        "id": 18,
        "name": "Banco Paris"
      },
      {
        "id": 19,
        "name": "Banco Consorcio"
      },
      {
        "id": 21,
        "name": "BciNova"
      },
      {
        "id": 4,
        "name": "CMR Falabella"
      },
      {
        "id": 11,
        "name": "Corpbanca"
      },
      {
        "id": 5,
        "name": "BancoEstado"
      },
      {
        "id": 20,
        "name": "Banco Falabella"
      },
      {
        "id": 6,
        "name": "Bci"
      },
      {
        "id": 9,
        "name": "Itau"
      },
      {
        "id": 12,
        "name": "Banco BICE"
      },
      {
        "id": 22,
        "name": "TBanc"
      },
      {
        "id": 23,
        "name": "Citi Bank Argentina"
      },
      {
        "id": 8,
        "name": "BBVA"
      }]

      return Bank;
    });

}());
