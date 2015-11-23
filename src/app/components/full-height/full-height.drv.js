(function () {
  'use strict';

  angular.module('finciero.cmp.fullHeight')
    .directive('finFullHeight', function ($timeout) {
      return {
        restrict: 'A',
        link: function ($scope, $element) {
          // TODO: Make this work on resizings
          var setElementMinHeight = function () {
            var bodyHeight = angular.element('body').height();
            $element.css('height', bodyHeight);
          };

          // Right after angular renders
          $timeout(function () {
            setElementMinHeight();
          });
        }
      };
    });

}());
