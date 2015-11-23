(function () {
  'use strict';

  angular.module('finciero.cmp.tabs')
    .directive('finTabs', function ($state) {
      return {
        templateUrl: 'app/components/tabs/tabs.html',
        restrict: 'E',
        replace: true,
        scope: {
          items: '='
        },
        link: function ($scope, $element, $attrs) {
          if ($attrs.mode === 'full') {
            angular.element($element).addClass('full');
          }

          $scope.$state = $state;
        }
      };
    });

}());
