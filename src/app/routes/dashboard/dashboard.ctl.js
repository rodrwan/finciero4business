(function () {
  'use strict';

  angular.module('finciero.rte.dashboard')

  .controller('DashboardCtrl', function HomeController (MENU, $scope) {
    $scope.menu = MENU;

  });
})();
