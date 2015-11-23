(function () {
  'use strict';

  angular.module('finciero.flt.commaToDot')
    .filter('commaToDot', function () {
      return function (input) {
        return input.replace(/,/g, '.');
      };
    });

}());
