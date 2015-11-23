(function () {
  'use strict';

  angular.module('finciero.svc.user')
    .factory('User', function (Restangular) {
      var User = Restangular.service('users');

      return User;
    });

}());
