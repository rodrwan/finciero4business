(function () {
  'use strict';

  angular.module('finciero.rte.planning')

  .controller('PlanningCtrl', function ($scope, $state, lodash) {
    $scope.tabsOptions = [];
    $scope.$state = $state;
    $scope.section = 'Presupuestos';

    $scope.$on('changeTab', function (obj, value) {
      $scope.section = value;
    });

    $state.go('planning.budgets');
  });
})();
