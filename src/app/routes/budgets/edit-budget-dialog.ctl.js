(function () {
  'use strict';

  angular.module('finciero.rte.budgets')
    .controller('EditBudgetDialogCtrl', function ($scope, budget) {
      $scope.budget = budget;
    });

}());
