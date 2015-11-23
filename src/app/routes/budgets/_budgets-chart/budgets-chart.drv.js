(function () {
  'use strict';

  angular.module('finciero.cmp.budgetsChart')
    .directive('finBudgetsChart', function ($compile, $timeout, $filter) {
      return {
        restrict: 'E',
        template: '<div class="budgets-chart"></div>',
        scope: {
          budgets: '='
        },
        compile: function (tElement) {
          var directiveHtml, element;
          directiveHtml = '<highchart config="chartConfig"></highchart>';
          element = tElement.children().html(directiveHtml);

          return {
            pre: function ($scope, $element, $attrs) {
              $scope.chartConfig = {
                options: {
                  chart: {
                    style: {
                      height: angular.isDefined($attrs.height) ? $attrs.height : '100%'
                    },
                    events: {
                      load: function () {
                        this.reflow();
                      }
                    }
                  },
                  tooltip: {
                    useHTML: true,
                    borderWidth: 0,
                    shadow: true,
                    style: {
                      padding: 0,
                      border: 'none',
                      'z-index': 1000
                    },
                    formatter: function () {
                      var html, amount;
                      amount = $filter('currency')(this.y, '$', 0);

                      html = '<div class="hs-tooltip" layout="column" layout-align="center center">' +
                               'Saldo presupuesto' +
                               '<span class="percentage">' +
                                  this.percentage.toFixed(2) + '%' +
                               '</span>' +
                               '<span class="amount">' +
                                  amount.replace(/,/g, '.') +
                               '</span>' +
                             '</div>';
                      return html;
                    }
                  },
                  exporting: {
                    enabled: false
                  }
                },
                series: [{
                  innerSize: '80%',
                  name: 'Presupuesto mensual',
                  cursor: 'pointer',
                  showInLegend: true,
                  type: 'pie',
                  dataLabels: {
                    enabled: false
                  },
                  data: [{
                    name: 'Gasto',
                    y: $scope.budgets.getTotalSpents(),
                    color: '#4dc3c5'
                  }, {
                    name: 'Saldo',
                    y: $scope.budgets.getTotalBudgets() - $scope.budgets.getTotalSpents(),
                    color: '#dee1e2'
                  }]
                }],
                title: {
                  text: ''
                },
                func: function (chart) {
                  $timeout(function () {
                    chart.reflow();
                  }, 0);
                }
              };
            },
            post: function ($scope) {
              $compile(element)($scope);
            }
          };
        }
      };
    });

}());
