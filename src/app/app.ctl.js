(function () {
  'use strict';

  angular.module('finciero')

  .controller('AppCtrl', function AppController (MENU, $rootScope, $scope, store) {
    function filterMenu (menu, user) {
      var newMenu = [];

      menu.forEach(function (data) {
        if (data.permission.indexOf(user) >= 0) {
          newMenu.push(data);
        }
      });

      return newMenu;
    }

    if (!store.get('session')) {
      console.log('no session active');
      $scope.menu = filterMenu(MENU, 'public');
    } else {
      console.log('session started');
      $scope.menu = filterMenu(MENU, 'admin');
    }
  });
})();
