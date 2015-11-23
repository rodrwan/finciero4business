(function () {
  'use strict';

  angular.module('finciero.cmp.focusBlurForm')
    .directive('finFocusBlurForm', function () {
      return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
          function element () {
            return angular.isDefined($attrs.isInputGroup) ? $element.parent().parent() : $element;
          }

          $element.on('focus', function () {
            element().addClass('focus');
          });

          $element.on('blur', function () {
            element().removeClass('focus');
          });
        }
      };
    });

}());
