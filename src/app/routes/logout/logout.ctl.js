(function () {
  'use strict';

  angular.module('finciero.rte.logout')

  .controller('LogoutCtrl', function HomeController (store, $state) {
    store.remove('session');
    store.remove('BankAccounts');
    $state.go('login');
  });
})();
