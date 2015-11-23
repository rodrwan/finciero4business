(function () {
  'use strict';

  angular.module('finciero.flt.roundNumber')
    .filter('roundNumber', function () {
      return function (input) {
        var number = parseFloat(input, 10);
        return Math.round(number).toString();
      };
    });

}());
