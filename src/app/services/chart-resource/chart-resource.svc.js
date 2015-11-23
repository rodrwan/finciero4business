(function () {
  'use strict';

  angular.module('finciero.svc.chartResource')
    .service('ChartResource', function (Restangular, SubAccount, CacheFactory) {
      var chartCache;

      chartCache = CacheFactory.get('ChartFactory');

      if (angular.isUndefined(chartCache)) {
        chartCache = CacheFactory.createCache('ChartFactory');
      }

      function employerDebts (values) {
        return Restangular.all('charts').customGET('company_vs_user_debts', values);
      }

      function employerAssets (values) {
        return Restangular.all('charts').customGET('company_vs_user_income', values);
      }

      function expensesByCategory (values) {
        return Restangular.all('charts').customGET('expenses_by_category', values);
      }

      function expensesBySubCategory (values) {
        return Restangular.all('charts').customGET('expenses_by_sub_category', values);
      }

      function incomeBySubCategory (values) {
        return Restangular.all('charts').customGET('income_by_sub_category', values);
      }

      function incomeExpenses (values) {
        return Restangular.all('charts').customGET('income_vs_expenses', values);
      }

      function assetsDebtsPerAccount () {
        return SubAccount.getList();
      }

      function netWorth (values) {
        return Restangular.all('charts').customGET('net_worth', values);
      }

      function get (type) {
        var fn;
        switch (type) {
          case 'employerDebts':
            fn = employerDebts;
            break;
          case 'employerAssets':
            fn = employerAssets;
            break;
          case 'expensesByCategory':
            fn = expensesByCategory;
            break;
          case 'expensesBySubCategory':
            fn = expensesBySubCategory;
            break;
          case 'incomeBySubCategory':
            fn = incomeBySubCategory;
            break;
          case 'incomeExpenses':
            fn = incomeExpenses;
            break;
          case 'assetsDebtsPerAccount':
            fn = assetsDebtsPerAccount;
            break;
          case 'netWorth':
            fn = netWorth;
            break;
        }

        return fn;
      }

      Restangular.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
        if (what === 'charts') {
          httpConfig.cache = chartCache;
        }
        return {
          element: element,
          headers: headers,
          params: params,
          httpConfig: httpConfig
        };
      });

      this.get = get;
    });

}());
