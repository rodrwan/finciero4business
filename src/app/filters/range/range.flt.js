(function () {
  'use strict';

  angular.module('finciero.flt.range')
    .filter('range', function () {
      return function (input, min, max) {
        var i;
        min = parseInt(min);
        max = parseInt(max);
        for (i = min; i < max; i++) {
          input.push(i);
        }
        return input;
      };
    });

}());
