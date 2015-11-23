(function () {
  'use strict';

  angular.module('finciero.cmp.notification')
    .directive('finNotification', function (Setting, $rootScope, $cacheFactory) {
      return {
        restrict: 'E',
        templateUrl: 'scripts/routes/user/_notification/notification.html',
        scope: {
          notification: '='
        },
        link: function ($scope) {
          $scope.settings = Setting.one();

          $scope.sendForm = function () {
            var value = {
              settings: {}
            };
            value.settings[$scope.notification.key] = $scope.notification.value;

            $scope.settings.patch({user: value})
              .then(function () {
                $rootScope.$emit('notifications:update', $scope.notification);
                $cacheFactory.get('$http').removeAll();
              }, function () {
                $scope.notification.value = !$scope.notification.value;
              });
          };
        }
      };
    });

}());
