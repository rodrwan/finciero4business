(function () {
  'use strict';

  angular.module('finciero.svc.flashMessage')
    .factory('FlashMessage', function ($mdToast) {
      var data = {};

      function show (message, type) {
        $mdToast.show({
          controller: 'FlashMessageCtrl',
          templateUrl: 'app/services/flash-message/flash-message.html',
          hideDelay: 5000,
          position: 'bottom right',
          locals: {
            messageLocals: message,
            typeLocals: type
          }
        });
      }

      data.show = show;

      return data;
    });

}());
