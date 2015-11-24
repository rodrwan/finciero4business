(function () {
  'use strict';

  angular.module('finciero.rte.dashboard')

  .controller('DashboardCtrl', function (MENU, $scope) {
    $scope.menu = MENU;

  });
})();
