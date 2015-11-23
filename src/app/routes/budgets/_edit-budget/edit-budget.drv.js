(function () {
  'use strict';

  angular.module('finciero.cmp.editBudget')
    .directive('finEditBudget', function (Category, Budget, $rootScope, $mdDialog, lodash, $log, FlashMessage, $cacheFactory) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/budgets/_edit-budget/edit-budget.html',
        replace: true,
        scope: {
          budget: '='
        },
        link: function ($scope) {
          var budgets = [];

          function cancelForm () {
            $mdDialog.hide();
          }

          $scope.updateBudget = angular.copy($scope.budget);

          budgets = Budget.getList().$object;

          Category.getList().then(function (categoryList) {
            $scope.elements = categoryList.allElements();
            $scope.elementSelectedId = categoryList.findByBudgetIds(lodash.pick($scope.budget, ['category_id', 'sub_category_id'])).id;

          }, function (err) {
            console.log('error to get categories in edit budget directive', err);
          });

          $scope.sendForm = function () {
            console.log(3333);
            var elementSelected, formatted;

            elementSelected = lodash.find($scope.elements, {id: $scope.elementSelectedId});
            formatted = lodash.assign($scope.updateBudget, lodash.omit(elementSelected, ['id', 'name', 'category_name']));

            $scope.updateBudget.patch({budget: formatted}).then(function () {
              $rootScope.$emit('budget:update', $scope.updateBudget);
              $mdDialog.hide();
              $cacheFactory.get('$http').removeAll();
              FlashMessage.show('El presupuesto ha sido editado con éxito.', true);
            }, function (err) {
              FlashMessage.show('Lo sentimos, pero ha ocurrido un error.', false);
              $log.error('budget:update', '> when update a budget', err);
            });
          };

          $scope.cancelForm = cancelForm;

        }
      };
    });

}());
