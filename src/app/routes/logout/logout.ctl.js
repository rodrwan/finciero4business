(function () {
  'use strict';

  angular.module('finciero.business.rte.logout')

  .controller('LogoutCtrl', function HomeController (store, $state) {
    store.remove('session');
    $state.go('login');
  });
})();
