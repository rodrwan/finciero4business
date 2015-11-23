(function () {
  'use strict';

  angular
    .module('finciero.cmp.sortOptions')
    .directive('finSortOptions', function ($state) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/routes/transactions/_transactions-table/_sort-options/sort-options.html',
        scope: {
          column: '=',
          name: '='
        },
        link: function ($scope) {

          function redirect (order) {
            var value = $scope.column + ',' + order;

            $state.go($state.current.name, {orderBy: value, currentPage: 1});
          }

          if (angular.isUndefined($scope.column)) {
            throw new Error('Invalid column query param: ' + $scope.column);
          }

          if (angular.isUndefined($scope.name)) {
            throw new Error('Invalid name query param: ' + $scope.column);
          }

          $scope.redirect = redirect;
        }
      }
    });

})();
