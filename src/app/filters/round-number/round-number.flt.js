(function () {
  'use strict';

  angular.module('finciero.business.flt.roundNumber')
    .filter('roundNumber', function () {
      return function (input) {
        var number = parseFloat(input, 10);
        return Math.round(number).toString();
      };
    });

}());
