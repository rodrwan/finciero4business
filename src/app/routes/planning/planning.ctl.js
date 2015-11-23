(function () {
  'use strict';

  angular.module('finciero.rte.planning')

  .controller('PlanningCtrl', function HomeController ($scope, $state, lodash) {
    $scope.tabsOptions = [];
    $scope.$state = $state;

    if (lodash.contains($state.current.url, 'balances')) {
      $scope.section = 'Balances';
    } else if (lodash.contains($state.current.url, 'budgets')) {
      $scope.section = 'Presupuestos';
    } else if (lodash.contains($state.current.url, 'flow')) {
      $scope.section = 'Flujo de Dinero';
    }

    $state.go('planning.budgets');
  });
})();
