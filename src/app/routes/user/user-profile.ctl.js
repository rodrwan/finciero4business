(function () {
  'use strict';

  angular.module('finciero.business.rte.user')
    .controller('UserProfileCtrl', function ($scope, $mdMedia) {
      $scope.$mdMedia = $mdMedia;
    });

}());
