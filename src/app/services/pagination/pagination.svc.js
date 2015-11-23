(function () {
  'use strict';

  angular.module('finciero.svc.pagination')
    /**
     * @module finciero.svc.pagination
     * @description
     * a simple service which paginates everything, using a meta paginator options
     */
    .provider('Pagination', function () {
      /**
       * @description
       * defines default values for pagination provider
       */
      var defaultValues_ = {
        currentPage: 1,
        perPage: 25,
        numberElements: 10
      };

      /**
       * @param {object} param values inserted in config module
       * @description
       * setter default values method by object param, this is a provider method.
       */
      this.setDefaultValues = function (dataObject) {
        if (!angular.isObject(dataObject)) {
          throw new Error('default values param is not correct ');
        }
        angular.extend(defaultValues_, dataObject);
      };
      /**
       * @return {object} paginator factory methods
       * @description
       * return an object with paginator factory methods
       */
      this.$get = function () {
        var pagination = {
          /**
           * @return {object} with values for pagination
           * @description
           * return values object for pagination with default or $stateParam values
           */
          getValues: function (stateParams) {
            var values = angular.copy(defaultValues_);

            if (!angular.isUndefined(stateParams) && !angular.isUndefined(stateParams.currentPage)) {
              values.currentPage = stateParams.currentPage;
            }
            if (!angular.isUndefined(stateParams) && !angular.isUndefined(stateParams.perPage)) {
              values.perPage = stateParams.perPage;
            }
            return {
              page: values.currentPage,
              per_page: values.perPage,
              number_elements: defaultValues_.numberElements
            };
          }

        };

        return pagination;
      };
    });

}());
