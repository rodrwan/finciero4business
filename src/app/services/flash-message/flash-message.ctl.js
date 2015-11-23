(function () {
  'use strict';

  angular.module('finciero.svc.flashMessage')
    .controller('FlashMessageCtrl', function ($scope, messageLocals, typeLocals) {
      $scope.message = messageLocals;
      $scope.type = typeLocals;
    });

}());
