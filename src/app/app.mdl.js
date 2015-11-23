(function () {
  'use strict';

  angular.module('finciero.business', [
    'ui.router',
    'angular-storage',
    'angular-cache',
    'ngAnimate',
    'restangular',
    'selectize',
    'pasvaz.bindonce',
    'ui.bootstrap',
    'flash',
    'ngMaterial',
    'finciero.business',
    'finciero.business.config',
    'finciero.business.rte.login',
    'finciero.business.rte.logout',
    'finciero.business.rte.dashboard',
    'finciero.business.rte.accounts',
    'finciero.business.rte.transactions',
    'finciero.business.rte.planning',
    'finciero.business.rte.user',
    'finciero.business.rte.firstRun',
    'finciero.business.rte.register',
    'finciero.business.drv.fbMenu',
    'finciero.flt.commaToDot',
    'finciero.flt.roundNumber',
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
