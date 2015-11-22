(function () {
  'use strict';

  angular.module('finciero.business.svc.transactions')
  .factory('Transactions', function (Restangular) {
    return Restangular.service('transactions');
  });

})();
