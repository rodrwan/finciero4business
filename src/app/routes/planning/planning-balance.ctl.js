(function () {
  'use strict';

  angular.module('finciero.rte.planning')

  .controller('PlanningBalancesCtrl', function ($scope, $state) {
    $scope.$emit('changeTab', 'Balances');
  });
})();
