(function () {
  'use strict';

  angular.module('finciero.business.drv.fbMenu')
  .directive('fbMenu', function (MENU, store) {
    return {
      restrict: 'E',
      scope: {
        menu: '='
      },
      templateUrl: 'app/directives/menu/menu.html',
      link: function ($scope) {
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
          $scope.menu = filterMenu($scope.menu, 'public');
        } else {
          console.log('session started');
          $scope.menu = filterMenu($scope.menu, 'private');
        }

        $scope.$on('logout', function () {
          console.log('bye bye');
          $scope.menu = MENU;
          $scope.menu = filterMenu($scope.menu, 'public');
        });

        $scope.$on('login', function () {
          console.log('hello');
          $scope.menu = MENU;
          $scope.menu = filterMenu($scope.menu, 'private');
        });
      }
    };
  });
})();
