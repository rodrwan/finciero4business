(function () {
  'use strict';

  angular.module('finciero.business.rte.dashboard', [
    'ui.router',
    'angular-storage',
    'finciero.business.drv.fbMenu',
    'finciero.business.dashboard.drv.fbMoneyIndicator',
    'finciero.cmp.widgetTableContainer',
    'finciero.business.drv.accountsSidebar'
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
