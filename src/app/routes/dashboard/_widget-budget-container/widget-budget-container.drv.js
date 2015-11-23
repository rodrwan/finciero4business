(function () {
  'use strict';

  angular.module('finciero.cmp.widgetBudgetContainer')
    .directive('finWidgetBudgetContainer', function ($log, FlashMessage, Budget, $mdDialog) {
      return {
        restrict: 'E',
        templateUrl: function ($element, $attrs) {
          if (angular.isUndefined($attrs.type)) {
            throw new Error('Param type is not defined');
          }
          return 'app/routes/dashboard/_widget-budget-container/widget-budget-container-' + $attrs.type + '.html';
        },
        replace: true,
        scope: {},
        link: function ($scope, $element, $attrs) {
          function getbudgetsValues () {
            $scope.budgets = Budget;
            $scope.isLoading = true;
            // Budget.getList().then(function (data) {
            //   $scope.budgets = data;
            //   $scope.isLoading = true;
            // }, function (err) {
            //   FlashMessage.show('Lo sentimos, pero ha ocurrido un error al cargar los presupuestos.', false);
            //   $log.error('widget-container:budgets', err);
            // });
          }
          function showAddBudgetDialog (ev) {
            $mdDialog.show({
              templateUrl: 'app/routes/budgets/new-budget-dialog.html',
              clickOutsideToClose: true,
              targetEvent: ev
            });
          }

          $scope.isLoading = false;
          $scope.showAddBudgetDialog = showAddBudgetDialog;

          if ($attrs.type === 'list' || $attrs.type === 'chart') {
            getbudgetsValues();
          }
        }
      };
    });

}());
