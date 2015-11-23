(function () {
  'use strict';

  angular.module('finciero.cmp.transactionSelectCategory')
    .directive('finTransactionSelectCategory', function ($rootScope, $log, CacheFactory) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/transactions/_transactions-table/_transaction-select-category/transaction-select-category.html',
        scope: {
          transaction: '=',
          subCategories: '='
        },
        link: function ($scope, $element) {
          var subCategorySelected;

          function updateTransactionSubCategory (subCategory) {
            var formatted, elementFind;
            elementFind = $element.find('.chosen-container-single .chosen-single');
            formatted = {
              sub_category_id: subCategory.id
            };

            if (subCategory.id === 1) {
              elementFind.addClass('uncategorized');
            } else {
              elementFind.removeClass('uncategorized');
            }

            $scope.transaction.customPOST({transaction: formatted}, 'categorize')
              .then(function (transaction) {
                angular.extend($scope.transaction, formatted);
                $rootScope.$emit('select-transaction:update', transaction);
                CacheFactory.get('TransactionFactory').removeAll();
                CacheFactory.get('ChartFactory').removeAll();
              }, function (err) {
                $log.error('select-transaction', '> when update transaction sub_category_id', err);
              });
          }

          subCategorySelected = $scope.subCategories[$scope.transaction.sub_category_id];

          if (angular.isDefined(subCategorySelected) && subCategorySelected.id === 1) {
            $element.find('.chosen-container-single .chosen-single').addClass('uncategorized');
          }

          $scope.updateTransactionSubCategory = updateTransactionSubCategory;
          $scope.subCategorySelected = subCategorySelected;
        }
      };
    });

}());
