(function () {
  'use strict';

  angular.module('finciero.svc.chartFilterList')
    .service('ChartFilterList', function (lodash, ChartFilter) {

      function add (filterName) {
        var filter;
        if (!angular.isString(filterName)) {
          throw new Error('Param is not correct.');
        }
        if (!this.exists(filterName)) {
          filter = new ChartFilter(filterName);
          this.filters.push(filter);
        }
        return;
      }

      function get (filterName) {
        var find;
        if (!angular.isString(filterName)) {
          throw new Error('Param is not correct.');
        }

        find = lodash.find(this.filters, {name: filterName});
        return !angular.isUndefined(find) ? find : undefined;
      }

      function exists (filterName) {
        var find;
        if (!angular.isString(filterName)) {
          throw new Error('Param is not correct.');
        }
        find = lodash.find(this.filters, {name: filterName});
        return !angular.isUndefined(find) ? true : false;
      }

      this.filters = [];
      this.add = add;
      this.get = get;
      this.exists = exists;
    });

}());
