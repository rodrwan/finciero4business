(function () {
  'use strict';

  angular.module('finciero.adminPanel.svc.simpleLink')
    .factory('SimpleLink', function (Restangular) {
      return Restangular.service('simple-links');
    });

})();
