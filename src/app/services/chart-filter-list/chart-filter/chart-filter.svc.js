(function () {
  'use strict';

  angular.module('finciero.svc.chartFilter')
    .factory('ChartFilter', function (lodash, $rootScope) {
      var filter;

      function Filter (filterName) {
        if (!angular.isString(filterName)) {
          throw new Error('Param is not correct.');
        }
        this.name = filterName;
        this.charts = [];
        this.options = {};
      }

      function getOptions () {
        return this.options;
      }

      function setOptions (options) {
        if (!angular.isObject(options)) {
          throw new Error('Params is not correct.');
        }
        lodash.assign(this.options, options);
      }

      function addChart (chartName) {
        if (!angular.isString(chartName)) {
          throw new Error('Param is not correct.');
        }
        this.charts.push(chartName);
      }

      function searchChart (chartName) {
        var bool = false;
        this.charts.some(function (name) {
          if (name === chartName) {
            bool = true;
            return true;
          }
          return false;
        });

        return bool ? true : false;
      }

      function refreshChartValues () {
        $rootScope.$emit('chart:refresh-chart-values', {filterName: this.name});
      }

      filter = Filter;
      filter.prototype.getOptions = getOptions;
      filter.prototype.setOptions = setOptions;
      filter.prototype.addChart = addChart;
      filter.prototype.searchChart = searchChart;
      filter.prototype.refreshChartValues = refreshChartValues;

      return filter;
    });

}());
