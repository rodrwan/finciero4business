(function () {
  'use strict';

  angular.module('finciero.rte.budgets', [
    'finciero.cmp.budget',
    'finciero.cmp.budgetsChart',
    'finciero.cmp.budgetsList',
    'finciero.cmp.newBudget',
    'finciero.svc.budget',
    'ngLodash'
    ])
    .config(function ($stateProvider) {
      $stateProvider
        .state('budgets', {
          url: '/budgets',
          templateUrl: 'app/routes/budgets/budgets.html',
          controller: 'BudgetsCtrl',
          data: {
            requiresLogin: true
          }
        });
    });
}());
