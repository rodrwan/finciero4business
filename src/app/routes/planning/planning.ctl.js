(function () {
  'use strict';

  angular.module('finciero.business.rte.planning')

  .controller('PlanningCtrl', function HomeController ($scope, $state) {
    $scope.tabsOptions = [];
    $scope.$state = $state;
    $state.go('planning.balances')
  });
})();
