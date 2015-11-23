(function () {
  'use strict';

  angular.module('finciero.cmp.newBudget')
    .directive('finNewBudget', function (Category, Budget, lodash, $mdDialog, $rootScope, $log, FlashMessage, $cacheFactory) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/budgets/_new-budget/new-budget.html',
        replace: true,
        scope: {},
        link: function ($scope) {
          var filters, budgets;

          function cancelForm () {
            $mdDialog.hide();
          }

          filters = {};
          budgets = [];

          $scope.elements = [];
          $scope.newBudget = {
            total: 10000
          };

          filters.existInUserBudgets = function (array) {
            lodash.each(budgets, function (budget) {
              array = lodash.reject(array, {category_id: budget.category_id, sub_category_id: budget.sub_category_id});
            });
            return array;
          };

          budgets = Budget.getList().$object;

          $scope.categories = Category.getList().then(function (data) {
            $scope.elements = filters.existInUserBudgets(data.allElements());
          }, function (err) {
            console.log('error to get categories in new budget directive', err);
          });

          $scope.sendForm = function () {
            var elementSelected, formatted;

            elementSelected = lodash.find($scope.elements, {id: $scope.elementSelectedId});
            formatted = lodash.assign($scope.newBudget, lodash.omit(elementSelected, ['id', 'name', 'category_name']));

            budgets.post({budget: formatted}).then(function (data) {
              $rootScope.$emit('budget:create', data);
              $mdDialog.hide();
              FlashMessage.show('El presupuesto ha sido creado con éxito.', true);
              $cacheFactory.get('$http').removeAll();
            }, function (err) {
              FlashMessage.show('Lo sentimos, pero ha ocurrido un error.', false);
              $log.error('budget:create', '> when create a budget', err);
            });
          };

          $scope.cancelForm = cancelForm;
        }
      };
    });

}());
