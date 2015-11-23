(function () {
  'use strict';

  angular.module('finciero.rte.planning', [
    'ui.router',
    'angular-storage',
    'finciero.drv.fbMenu',
    'finciero.rte.budgets',
    'ngLodash'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('planning', {
      url: '/planning',
      controller: 'PlanningCtrl',
      templateUrl: 'app/routes/planning/planning.html',
      data: {
        requiresLogin: true
      }
    })
    .state('planning.budgets', {
      url: '/budgets',
      controller: 'BudgetsCtrl',
      templateUrl: 'app/routes/budgets/budgets.html',
      data: {
        requiresLogin: true
      }
    })
    .state('planning.balances', {
      url: '/balances',
      controller: 'PlanningBalancesCtrl',
      templateUrl: 'app/routes/planning/planning-balance.html',
      data: {
        requiresLogin: true
      }
    })
    .state('planning.flow', {
      url: '/flow',
      controller: 'PlanningFlowCtrl',
      templateUrl: 'app/routes/planning/planning-flow.html',
      data: {
        requiresLogin: true
      }
    });

  });
})();
