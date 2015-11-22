(function () {
  'use strict';

  angular.module('finciero.business.svc.session')
    .factory('Session', function (Restangular) {
      return Restangular.service('session');
    });

})();
