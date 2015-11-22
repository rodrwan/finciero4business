(function () {
  'use strict';

  angular.module('finciero.business.svc.login')
  .factory('Login', function (Restangular) {
    return Restangular.service('login');
  })
  .factory('Status', function (Restangular) {
    return Restangular.service('status');
  })
  .factory('Logout', function (Restangular) {
    return Restangular.service('logout');
  })

  .factory('Session', function (Login, Status, Logout, CacheFactory, $q, store) {
    var create, logout, status;

    create = function (username, password) {
      var deferred = $q.defer(),
          data = {
            username: username,
            password: password
          };
      Login.post(data).then(function (res) {
        if (res.username) {
          store.set('session', {
            username: res.username,
            token: res.token
          });

          deferred.resolve({
            active: true,
            username: username
          });
        }
      }, function () {
        deferred.reject('Bad credentials');
      });

      return deferred.promise;
    };

    logout = function () {
      store.remove('session');
      CacheFactory.clearAll();
      return Logout.getList();
    };

    status = function () {
      var session = store.get('session'),
          deferred = $q.defer();
      console.log('Requesting session status.');

      Status.getList().then(function () {
        if (session !== null) {
          deferred.resolve({
            status: 'logged',
            username: session.username
          });
        }
      }, function (err) {
        store.remove('session');
        CacheFactory.clearAll();
        deferred.resolve({
          status: err.data,
          username: ''
        });
      });

      return deferred.promise;
    };

    return {
      create: create,
      logout: logout,
      status: status
    };
  });
})();
