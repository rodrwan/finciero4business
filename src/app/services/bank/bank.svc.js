(function () {
  'use strict';

  angular.module('finciero.svc.bank')
    .factory('Bank', function () {
      var Bank = [{
        id: 1,
        name: 'Banco Santander'
      }, {
        id: 2,
        name: 'Banco de Chile'
      }];

      return Bank;
    });

}());
