(function () {
  'use strict';

  angular.module('finciero.svc.session')
    .factory('Session', function (Restangular) {
      return Restangular.service('session');
    });

})();
