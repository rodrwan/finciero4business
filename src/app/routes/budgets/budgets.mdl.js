(function () {
  'use strict';

  angular.module('finciero.rte.budgets', [
    'finciero.cmp.budget',
    'finciero.cmp.budgetsChart',
    'finciero.cmp.budgetsList',
    'finciero.cmp.navbar',
    'finciero.cmp.newBudget',
    'finciero.cmp.sectionsAccountsSidebar',
    'finciero.svc.budget',
    'ngLodash',
    'permission'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('budgets', {
        url: '/budgets',
        templateUrl: 'app/routes/budgets/budgets.html',
        controller: 'BudgetsCtrl',
        resolve: {
          budgetsResolve: function (Budget) {
            return Budget.getList();
          }
        },
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        }
      });
  });
}());
