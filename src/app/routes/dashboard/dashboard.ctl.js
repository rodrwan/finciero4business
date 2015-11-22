(function () {
  'use strict';

  angular.module('finciero.business.rte.dashboard')

  .controller('DashboardCtrl', function HomeController (MENU, $scope) {
    $scope.menu = MENU;

  });
})();
