(function () {
  'use strict';

  angular.module('finciero.cmp.dropdown')
    .directive('finDropdown', function ($document) {
      return {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
          finDropdownClass: '@?'
        },
        template: '<span ng-init="showMenu = false">' +
                    '<span class="dmenu" ng-click="showMenu = !showMenu"></span>' +
                    '<span class="dcontent" ng-show="showMenu" ng-class="finDropdownClass" ng-style="menuStyle"></span>' +
                  '</span>',

        link: function (scope, element, attrs, controller, transclude) {
          var dropdownMenu, dropdownContent;

          dropdownMenu = element.find('.dmenu');
          dropdownContent = element.find('.dcontent');

          scope.menuStyle = {
            position: 'absolute',
            'z-index': 1000
          };

          transclude(function (clone) {
            dropdownMenu.html(clone[1]);
            dropdownContent.html(clone[3]);
          });

          element.on('mousedown', function () {
            // horizontal position
            if (attrs.finDropdownHorizontalPosition === 'left') {
              scope.menuStyle.left = 0;
            } else if (attrs.finDropdownHorizontalPosition === 'right') {
              scope.menuStyle.right = 0;
            } else {
              scope.menuStyle.left = element.prop('offsetLeft') + 1 + 'px';
            }

            // vertical position
            if (angular.isUndefined(scope.finDropdownClass)) {
              scope.menuStyle.top = (element.prop('offsetTop') + element.prop('offsetHeight') + 5) + 'px';
            }
          });

          element.on('click', function (event) {
            event.stopPropagation();
          });

          $document.on('click', function () {
            scope.showMenu = false;
            scope.$apply();
          });
        }
      };
    });

})();
