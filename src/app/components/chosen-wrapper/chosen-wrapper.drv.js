(function () {
  'use strict';

  angular.module('finciero.cmp.chosenWrapper')
    .directive('chosen', function () {
      return {
        name: 'chosen',
        scope: {
          ngModel: '=',
          ngDisabled: '=?',
          onChange: '=?'
        },
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
          var placeholderAttrs;

          // load some params for chosen config
          placeholderAttrs = (angular.isDefined($attrs.placeholder) && angular.isString($attrs.placeholder)) ? $attrs.placeholder : undefined;

          // initialize chosen in directive element
          $element.chosen({
            placeholder_text_single: placeholderAttrs
          });

          // onChange event element
          $element.on('change', function () {
            if (angular.isUndefined($scope.onChange) && !angular.isFunction($scope.onChange)) {
              throw new Error('Incorrect param. [onChange]');
            }
            $scope.onChange($scope.ngModel);
            $element.trigger('chosen:updated');
          });

          // watchers for scope vars
          $scope.$watchGroup(['ngModel', 'ngDisabled'], function () {
            $element.trigger('chosen:updated');
          });
        }
      };
    });
})();
