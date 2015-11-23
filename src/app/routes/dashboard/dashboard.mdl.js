(function () {
  'use strict';

  angular.module('finciero.rte.dashboard', [
    'ui.router',
    'angular-storage',
    'finciero.drv.fbMenu',
    'finciero.dashboard.drv.fbMoneyIndicator',
    'finciero.cmp.widgetTableContainer',
    'finciero.drv.accountsSidebar'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      controller: 'DashboardCtrl',
      templateUrl: 'app/routes/dashboard/dashboard.html',
      data: {
        requiresLogin: true
      }
    });
  });
})();
