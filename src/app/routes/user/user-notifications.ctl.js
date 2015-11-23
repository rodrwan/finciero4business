(function () {
  'use strict';

  angular.module('finciero.business.rte.user')
    .controller('UserNotificationsCtrl', function ($scope, Session, lodash) {
      var session, count, notifications;

      // TODO: changes this if will implement settings endpoint
      session = Session;
      count = 0;

      notifications = [
      'Cargos mas grandes de lo usual',
      'Cobro de comisiones bancarias',
      'Recordarme pagar mis tarjetas de crédito',
      'Presupuestos'
      ];

      $scope.notifications = lodash.map(session.currentUser.settings, function (data, key) {
        var temporalObject = {};
        temporalObject.value = data;
        temporalObject.text = notifications[count];
        temporalObject.key = key;
        count++;

        return temporalObject;
      });

    });

}());
