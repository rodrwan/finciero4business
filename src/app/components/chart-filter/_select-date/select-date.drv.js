(function () {
  'use strict';

  angular.module('finciero.cmp.chartFilterSelectDate')
    .directive('finChartFilterSelectDate', function (lodash, $moment, ChartFilterList, $rootScope, Session) {
      return {
        templateUrl: 'scripts/components/chart-filter/_select-date/select-date.html',
        restrict: 'E',
        replace: true,
        scope: {},
        link: function ($scope, $element, $attrs) {
          var today, filterName, filter, sinceBirth;

          function setOptions () {
            var values, findSelect;

            findSelect = lodash.find($scope.filterValues.data, {value: $scope.filterValues.option});

            values = {
              start_date: findSelect.startDate.format('YYYY-MM-DD'),
              end_date: findSelect.endDate.format('YYYY-MM-DD'),
              granularity: findSelect.granularity
            };

            filter.setOptions(values);
            $rootScope.$emit($attrs.filterName + ':refresh');
          }

          function sendOptions () {
            filter.refreshChartValues();
          }

          function change () {
            setOptions();
            sendOptions();
          }

          today = $moment();
          sinceBirth = $moment(Session.currentUser.date_since_birth, 'YYYY-MM-DD');
          filterName = $attrs.filterName;
          filter = ChartFilterList.get(filterName);

          $scope.change = change;

          $scope.filterValues = {
            data: [{
              value: 0,
              granularity: 'days',
              name: 'Últimos 7 días',
              startDate: angular.copy(today).subtract(6, 'days'),
              endDate: angular.copy(today).endOf('month')
            }, {
              value: 1,
              granularity: 'days',
              name: 'Últimos 14 días',
              startDate: angular.copy(today).subtract(13, 'days'),
              endDate: angular.copy(today).endOf('month')
            }, {
              value: 2,
              granularity: 'days',
              name: 'Este mes',
              startDate: angular.copy(today).startOf('month'),
              endDate: angular.copy(today).endOf('month')
            }, {
              value: 3,
              granularity: 'days',
              name: 'Mes anterior',
              startDate: angular.copy(today).subtract(1, 'months').startOf('month'),
              endDate: angular.copy(today).subtract(1, 'months').endOf('month')
            }, {
              value: 4,
              granularity: 'months',
              name: 'Últimos 3 meses',
              startDate: angular.copy(today).subtract(2, 'months').startOf('month'),
              endDate: angular.copy(today).endOf('month')
            }, {
              value: 5,
              granularity: 'months',
              name: 'Últimos 6 meses',
              startDate: angular.copy(today).subtract(5, 'months').startOf('month'),
              endDate: angular.copy(today).endOf('month')
            }, {
              value: 6,
              granularity: 'months',
              name: 'Últimos 12 meses',
              startDate: angular.copy(today).subtract(11, 'months').startOf('month'),
              endDate: angular.copy(today).endOf('month')
            }, {
              value: 7,
              granularity: 'months',
              name: 'Este año',
              startDate: angular.copy(today).startOf('year'),
              endDate: angular.copy(today).endOf('year')
            }, {
              value: 8,
              granularity: 'months',
              name: 'Año pasado',
              startDate: angular.copy(today).subtract(1, 'years').startOf('year'),
              endDate: angular.copy(today).subtract(1, 'years').endOf('year')
            }, {
              value: 9,
              granularity: 'months',
              name: 'Todo',
              startDate: sinceBirth,
              endDate: angular.copy(today).endOf('month')
            }],
            option: 1
          };

          setOptions();
          //sendOptions();
        }
      };
    });

}());
