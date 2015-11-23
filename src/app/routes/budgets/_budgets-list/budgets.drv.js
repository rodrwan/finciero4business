(function () {
  'use strict';

  angular.module('finciero.cmp.budgetsList')
    .directive('finBudgetsList', function () {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/budgets/_budgets-list/budgets-list.html',
        scope: {
          budgets: '=',
          showOptions: '='
        }
      };
    });

}());
