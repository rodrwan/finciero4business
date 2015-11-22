(function () {
  'use strict';

  angular.module('finciero.adminPanel.svc.categories')
  .factory('Categories', function (Restangular, CacheFactory) {
    var categoriesCache, categoriesService;

    categoriesCache = CacheFactory.createCache('categoriesCache', {
      maxAge: 24 * 60 * 60 * 1000,
      cacheFlushInterval: 24 * 60 * 60 * 1000,
      deleteOnExpire: 'aggressive',
      storageMode: 'localStorage'
    });

    categoriesService = Restangular.service('categories');
    Restangular.addFullRequestInterceptor(function (element, operation, what,
      url, headers, params, httpConfig) {
      if (what === 'categories') {
        switch (operation) {
          case 'getList':
            httpConfig.cache = categoriesCache;
            break;
          default:
            break;
        }
      }
      return {
        element: element,
        headers: headers,
        params: params,
        httpConfig: httpConfig
      };
    });

    return categoriesService;
  });
})();

