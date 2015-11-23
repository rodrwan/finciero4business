(function () {
  'use strict';

  angular.module('finciero.svc.chart')
    .factory('Chart', function (lodash, $rootScope, ChartResource, ChartFilterList, $state) {
      var chart;

      function Chart (chartName, chartType, scope) {
        var self = this;

        this.name = chartName;
        this.type = chartType;
        this.filters = [];
        this.active = false;
        this.scope = scope;
        this.stateName = $state.current.name;

        $rootScope.$on('chart:refresh-chart-values', function (event, data) {
          if (self.hasFilter(data.filterName)) {
            self.reloadValues();
          } else if (data.filterName === 'all') {
            if (self.name === data.chartName) {
              self.reloadValues();
            }
          }
        });
      }

      // add an array filters to chart
      function addFilters (array) {
        var self = this;
        if (!angular.isArray(array)) {
          throw new Error('Param is not correct.');
        }

        angular.forEach(array, function (filterName) {
          var filter = ChartFilterList.get(filterName);

          if (angular.isUndefined(filter)) {
            throw new Error('Filter not exist.');
          }
          if (!filter.searchChart(self.name)) {
            filter.addChart(self.name);
          }
          self.filters.push(filter);
        });
      }

      // get a one filter by name
      function getFilter (filterName) {
        var find;
        if (!angular.isString(filterName)) {
          throw new Error('Param is not correct.');
        }
        find = lodash.find(this.filters, {name: filterName});

        if (angular.isUndefined(find)) {
          throw new Error('Filter not exist.');
        }
        return find;
      }

      // get filters array
      function getFilters () {
        return this.filters;
      }

      // return boolean value if exist this filter
      function hasFilter (filterName) {
        var find;
        if (!angular.isString(filterName)) {
          throw new Error('Param is not correct.');
        }
        find = lodash.find(this.filters, {name: filterName});

        return angular.isUndefined(find) ? false : true;
      }

      // get all filters options for a chart
      function getOptions () {
        var options, self;
        options = {};
        self = this;

        angular.forEach(this.filters, function (filter) {
          filter.charts.some(function (chartName) {
            if (chartName === self.name) {
              lodash.assign(options, filter.options);
              return true;
            }
            return false;
          });
        });

        return options;
      }

      // reload values for this chart
      function reloadValues () {
        var options, self;
        options = this.getOptions();
        self = this;

        ChartResource.get(this.type)(options)
          .then(function (values) {
            $rootScope.$emit('chart:' + self.name + ':reload-values', {type: self.type, values: values});
          });
      }

      // first run from route controller
      function run (arrayName) {
        var array, self;
        self = this;

        if (!this.active) {
          array = angular.isDefined(arrayName) ? arrayName : 'chartValues';
          this.active = true;

          $rootScope.$on('chart:' + this.name + ':reload-values', function (event, data) {
            if ($state.current.name === self.stateName) {
              self.scope[array] = data.values;
            }
          });
        }

        // TODO: find a best solution using promise pattern, since the first time 'this.getOptions()' is empty
        if (!lodash.isEmpty(this.getOptions())) {
          $rootScope.$emit('chart:refresh-chart-values', {filterName: 'all', chartName: this.name});
        }
      }

      // sets scope object to chart class
      function setScope (scope) {
        this.scope = scope;
      }

      chart = Chart;
      chart.prototype.addFilters = addFilters;
      chart.prototype.getFilter = getFilter;
      chart.prototype.getFilters = getFilters;
      chart.prototype.getOptions = getOptions;
      chart.prototype.hasFilter = hasFilter;
      chart.prototype.reloadValues = reloadValues;
      chart.prototype.run = run;
      chart.prototype.setScope = setScope;

      return chart;
    });

}());
