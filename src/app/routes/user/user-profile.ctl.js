(function () {
  'use strict';

  angular.module('finciero.rte.user')
    .controller('UserProfileCtrl', function ($scope, $mdMedia) {
      $scope.$mdMedia = $mdMedia;
    });

}());
