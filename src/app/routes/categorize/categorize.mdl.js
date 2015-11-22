(function () {
  'use strict';

  angular.module('finciero.adminPanel.rte.categorize', [
    'ui.router',
    'angular-storage',
    'finciero.adminPanel.svc.categories',
    'finciero.adminPanel.svc.ccontraints',
    'finciero.adminPanel.svc.transactions',
    'finciero.adminPanel.svc.unknowns',
    'finciero.adminPanel.drv.inputCheckbox',
    'finciero.adminPanel.drv.inputSelect',
    'finciero.adminPanel.drv.unknownButton',
    'finciero.adminPanel.rte.categorize.pageInput'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('categorize', {
      url: '/categorize',
      controller: 'CatCtrl',
      templateUrl: 'app/routes/categorize/categorize.html',
      data: {
        requiresLogin: true
      }
    });
  });
})();
