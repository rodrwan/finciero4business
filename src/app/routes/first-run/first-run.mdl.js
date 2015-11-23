(function () {
  'use strict';

  angular.module('finciero.rte.firstRun', [
    'ui.router',
    'angular-storage'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('first-run', {
      url: '/first-run',
      controller: 'FirstRunCtrl',
      templateUrl: 'app/routes/first-run/first-run.html'
    });
  });
})();
