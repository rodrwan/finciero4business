(function () {
  'use strict';

  angular.module('finciero.svc.bank')
    .factory('Bank', function (Restangular) {
      var Bank = Restangular.service('banks');

      return Bank;
    });

}());