(function () {
  'use strict';

  angular.module('finciero.adminPanel.drv.loading')
  .directive('loading', function () {
    return {
      restrict: 'E',
      controller: function ($rootScope, $scope) {

        $rootScope.$on('loadingShow', function (value) {
          $scope.loading = true;
        });

        $rootScope.$on('loadingHide', function (value) {
          $scope.loading = false;
        });
      },
      templateUrl: 'app/directives/loading/loading.html'
    };
  });
})();
