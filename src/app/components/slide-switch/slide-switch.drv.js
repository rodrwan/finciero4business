(function () {
 'use strict';

  angular.module('finciero.cmp.SlideSwitch')
    .directive('finSlideSwitch', function () {
      return {
        restrict: 'E',
        templateUrl: 'scripts/components/slide-switch/slide-switch.html',
        compile: function (elem, attr) {
          var input = elem.find('input');
          var elemAttrs = {
            'name': attr.name,
            'ng-value': attr.ngValue,
            'ng-model': attr.ngModel,
            'ng-checked': attr.ngChecked,
            'ng-disabled': attr.ngDisabled,
            'ng-true-value': attr.ngTrueValue,
            'ng-false-value': attr.ngFalseValue,
            'ng-change': attr.ngChange
          };

          _.each(elemAttrs, function (value, key) {
            if (!_.isUndefined(value)) {
              input.attr(key, value);
            }
          });
        }
      };
    });

}());
