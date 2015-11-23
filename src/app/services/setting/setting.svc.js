(function () {
  'use strict';

  angular.module('finciero.svc.setting')
    .factory('Setting', function (Restangular, $q, $moment, Session, FlashMessage, $rootScope) {

      Restangular.extendModel('profile', function (model) {
        model.notifyScrape = function () {
          var defer, lastScraping, now, diff, currentUser;

          function sendPOST () {
            model.customPOST({}, 'scrape')
            .then(function () {
              $rootScope.$emit('first-account-form:scrape');
              FlashMessage.show('Estamos actualizando tus cuentas.', true);
              defer.resolve();
            }, function (err) {
              FlashMessage.show('Lo sentimos, pero ha ocurrido un error.', false);
              defer.reject();
              console.log('first-account:scrape', '> when first scraping', err);
            });
          }

          defer = $q.defer();
          currentUser = Session.currentUser;

          if (currentUser.last_scraping_date === null) {
            sendPOST();
          } else {
            lastScraping = currentUser.last_scraping_date;
            now = $moment();
            diff = now.diff(lastScraping, 'm');

            if (diff >= 10) {
              sendPOST();
            } else {
              defer.reject();
              FlashMessage.show('Lo sentimos, pero tienes que esperar ' + (10 - diff) + ' minutos.', false);
            }
          }
          return defer.promise;
        };

        return model;
      });

      return Restangular.service('profile');
    });

}());
