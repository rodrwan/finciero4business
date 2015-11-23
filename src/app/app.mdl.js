(function () {
  'use strict';

  angular.module('finciero', [
    'finciero.config',
    'finciero.rte.login',
    'finciero.rte.logout',
    'finciero.rte.dashboard',
    'finciero.rte.accounts',
    'finciero.rte.transactions',
    'finciero.rte.planning',
    'finciero.rte.user',
    'finciero.rte.firstRun',
    'finciero.rte.register',
    'finciero.drv.fbMenu',
    'finciero.flt.commaToDot',
    'finciero.flt.roundNumber',
    'angular-storage',
    'angular-cache',
    'flash',
    'ngAnimate',
    'ngMaterial',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'pasvaz.bindonce',
    'restangular',
    'selectize',
    'ui.router'
  ])

  .config(function MLConfig (CATEGORY_API_URL, $stateProvider, $urlRouterProvider, CacheFactoryProvider, RestangularProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider.state('main', {
      url: '/',
      controller: 'AppCtrl',
      templateUrl: 'app/routes/dashboard/dashboard.html'
    });
    angular.extend(CacheFactoryProvider.defaults, {
      maxAge: 15 * 60 * 1000
    });

    RestangularProvider.setBaseUrl(CATEGORY_API_URL);
  })

  .run(function ($rootScope, $state, store) {
    $rootScope.$on('$stateChangeStart', function (e, to) {
      if (to.data && to.data.requiresLogin) {
        if (!store.get('session')) {
          e.preventDefault();
          $state.go('login');
        }
      }
    });
  })

  .filter('sanitize', function ($sce) {
    return function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };
  })

  .constant('MENU', [{
    title: 'Dashboard',
    url: 'dashboard',
    permission: ['private']
  }, {
    title: 'Cuentas',
    url: 'accounts',
    permission: 'private'
  }, {
    title: 'Transactions',
    url: 'transactions',
    permission: 'private'
  }, {
    title: 'Transferencias',
    url: 'transfers',
    permission: 'private'
  }, {
    title: 'Planificación',
    url: 'planing',
    permission: 'private'
  }, {
    title: 'Salir',
    url: 'logout',
    permission: 'private'
  }]);
})();
