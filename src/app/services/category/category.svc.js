(function () {
  'use strict';

  angular.module('finciero.svc.category')
    .factory('Category', function (Restangular, lodash, CacheFactory) {
      var categoryCache = CacheFactory.createCache('CategoryFactory');

      Restangular.extendCollection('categories', function (collection) {

        // TODO: optimize this method
        // categories and sub_categories elements array
        collection.allElements = function () {
          var elementsList, category_id, category_name, index;
          elementsList = [];
          index = 0;

          // create an array with categories and sub catories elements
          lodash.each(collection, function (data) {
            category_id = data.id;
            category_name = data.name;

            elementsList.push({
              id: index++,
              category_id: category_id,
              sub_category_id: 0,
              name: category_name
            });

            if (!lodash.isEmpty(data.sub_categories)) {
              lodash.each(data.sub_categories, function (data) {
                elementsList.push({
                  id: index++,
                  category_id: category_id,
                  sub_category_id: data.id,
                  name: data.name,
                  category_name: category_name
                });
              });
            }
          });
          return elementsList;
        };

        /**
         * Get sub categories array from cache or lodash methods
         * @return {String} sub categories array
         */
        collection.subCategoriesList = function () {
          var cache, subCategoriesList;
          cache = CacheFactory.get('CategoryFactory');

          if (angular.isDefined(cache.get('subCategoriesList'))) {
            return cache.get('subCategoriesList');
          }

          subCategoriesList = lodash.reduce(collection, function (obj, category) {
            var categoryName = category.name;
            return lodash.reduce(category.sub_categories, function (ob, subCategory) {
              subCategory.categoryName = categoryName;
              ob[subCategory.id] = subCategory;
              return ob;
            }, obj);
          }, {});

          cache.put('subCategoriesList', subCategoriesList);

          return subCategoriesList;
        };

        // method to return an element by category and sub_categories ids
        collection.findByBudgetIds = function (elementsIds) {
          var elementsList = collection.allElements();
          return lodash.find(elementsList, {
            category_id: elementsIds.category_id,
            sub_category_id: elementsIds.sub_category_id
          });
        };

        // method to return an element by sub_category id
        collection.findBySubCategoryId = function (sub_category_id) {
          var elementsList = collection.allElements();
          return lodash.find(elementsList, {sub_category_id: sub_category_id});
        };

        return collection;
      });

      return Restangular.all('categories').withHttpConfig({cache: categoryCache});
    });

}());
