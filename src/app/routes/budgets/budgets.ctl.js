(function () {
  'use strict';

  angular.module('finciero.rte.budgets')
    .controller('BudgetsCtrl', function ($scope, Budget, lodash, $rootScope, $mdDialog, $mdMedia) {
      function showAddBudgetDialog (ev) {
        $mdDialog.show({
          templateUrl: 'app/routes/budgets/new-budget-dialog.html',
          clickOutsideToClose: true,
          targetEvent: ev
        });
      }

      $scope.showAddBudgetDialog = showAddBudgetDialog;
      $scope.budgets = Budget;
      $scope.$mdMedia = $mdMedia;


      $rootScope.$on('budget:create', function (event, data) {
        $scope.budgets.push(data);
      });
      $rootScope.$on('budget:update', function (event, data) {
        $scope.budgets.some(function (budget, index) {
          if (budget.id === data.id) {
            $scope.budgets[index] = data;
            return true;
          }
          return false;
        });
      });
      $rootScope.$on('budget:remove', function (event, data) {
        $scope.budgets.some(function (budget, index) {
          if (budget.id === data.id) {
            $scope.budgets.splice(index, 1);
            return true;
          }
          return false;
        });
      });

    });

}());
