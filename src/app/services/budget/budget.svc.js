(function () {
  'use strict';

  angular.module('finciero.svc.budget')
  .factory('Budget', function ($q) {
    var $defer, budgets;

    $defer = $q.defer();

    budgets = {
      getTotalSpents: function () {
        return (4750000 + 712500 + 650000 + 187500);
      },
      getTotalBudgets: function () {
        return (5000000 + 750000 + 1000000 + 250000);
      },
      data: [{
        category: 'Sueldos',
        total: 5000000,
        getPercentage: function () {
          return 95;
        }
      }, {
        category: 'Pagos Provicionales',
        total: 750000,
        getPercentage: function () {
          return 95;
        }
      }, {
        category: 'Impuestos',
        total: 1000000,
        getPercentage: function () {
          return 65;
        }
      }, {
        category: 'Marketing',
        total: 250000,
        getPercentage: function () {
          return 75;
        }
      }]
    };

    return budgets;
  });

}());
