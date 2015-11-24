(function () {
  'use strict';

  angular.module('finciero.svc.bank')
    .factory('Bank', function () {
      var Bank = [{
        id: 1,
        name: 'Banco de Chile / Edwards Citi'
      }, {
        id: 2,
        name: 'Banco Santander'
      }];

      return Bank;
    });

}());
