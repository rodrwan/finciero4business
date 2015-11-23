(function () {
  'use strict';

  angular.module('finciero.svc.chartList')
    .service('ChartList', function (lodash, Chart) {

      function stringValidateParam (param) {
        if (!angular.isString(param)) {
          throw new Error('Param is not correct.');
        }
      }

      function add (chartName, chartType, scope) {
        var chart;
        stringValidateParam(chartName);

        chart = new Chart(chartName, chartType, scope);
        this.charts.push(chart);
        return;
      }

      function get (chartName) {
        var find;
        stringValidateParam(chartName);

        find = lodash.find(this.charts, {name: chartName});
        return !angular.isUndefined(find) ? find : undefined;
      }

      function exists (chartName) {
        var find;
        stringValidateParam(chartName);

        find = lodash.find(this.charts, {name: chartName});
        return !angular.isUndefined(find) ? true : false;
      }

      function getAll () {
        return this.charts;
      }

      function run (data, scope, arrayName) {
        var chart;
        if (!this.exists(data.name)) {
          this.add(data.name, data.type, scope);
        }
        chart = this.get(data.name);
        chart.addFilters(data.filters);
        chart.setScope(scope);
        chart.run(arrayName);
      }

      this.charts = [];
      this.add = add;
      this.get = get;
      this.getAll = getAll;
      this.exists = exists;
      this.run = run;
    });

}());
