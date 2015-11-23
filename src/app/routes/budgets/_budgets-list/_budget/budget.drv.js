(function () {
  'use strict';

  angular.module('finciero.cmp.budget')
    .directive('finBudget', function ($mdDialog, $log, $rootScope) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/budgets/_budgets-list/_budget/budget.html',
        replace: true,
        scope: {
          budget: '=',
          showOptions: '='
        },
        link: function ($scope) {
          // watcher for any change in scope var: budget.total
          $scope.$watch('budget.total', function (value) {
            $scope.percentage = $scope.budget.getPercentage(value);
          });

          $scope.showEditDialog = function (ev) {
            $mdDialog.show({
              templateUrl: 'app/routes/budgets/edit-budget-dialog.html',
              controller: 'EditBudgetDialogCtrl',
              clickOutsideToClose: true,
              targetEvent: ev,
              locals: {
                budget: $scope.budget
              }
            });
          };
          $scope.showRemoveDialog = function (ev) {
            var confirm;
            confirm = $mdDialog.confirm()
              .title('¿Estás seguro?')
              .content('Los cambios realizados serán irreversibles')
              .ok('Si')
              .cancel('No')
              .targetEvent(ev);

            $mdDialog.show(confirm)
              .then(function () {
                return $scope.budget.remove();
              })
              .then(function () {
                $rootScope.$emit('budget:remove', $scope.budget);
              }, function (err) {
                $log.error('budget:remove', '> when remove a budget', err);
              });
          };
        }
      };
    });

}());
