 (function () {
  'use strict';

  angular.module('finciero.svc.socket')
    .factory('Socket', function ($rootScope, socketFactory, ENV, Session, $q, bugsnag) {
      var data = {};

      function connect () {
        var defer, socketConfig;

        defer = $q.defer();

        if (Session.hasSessionData()) {

          socketConfig = io(ENV.pubsubURL, {
            query: {token: Session.token},
            'force new connection': true
          });
          
          socketConfig.on('connect', function () {
            $rootScope.$emit('socket:event-listeners');
            defer.resolve();
          });

          //socketConfig.on('disconnect', function () {);

          socketConfig.on('error', function (err) {
            defer.reject('error');
          });

          socketConfig.on('reconnect', function (err) {
            defer.reject('reconnect');
          });

          data.resource = socketFactory({
            ioSocket: socketConfig
          });
        } else {
          throw new Error('Token is not defined');
        }

        return defer.promise;
      }

      function hasConnection () {
        return angular.isDefined(data.resource) ? true : false;
      }

      function clearConnection () {
        data.resource.disconnect();
        data.resource = undefined;
      }

      data.connect = connect;
      data.hasConnection = hasConnection;
      data.resource = undefined;

      $rootScope.$on('Socket:clearConnection', function () {
        clearConnection();  
      })

      return data;
    });

}());
