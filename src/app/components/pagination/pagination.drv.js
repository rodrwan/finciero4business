(function () {
  'use strict';

  angular.module('finciero.cmp.pagination')
    .directive('finPagination', function ($filter, $state, Pagination) {
      return {
        restrict: 'E',
        templateUrl: 'app/components/pagination/pagination.html',
        scope: {
          metaOptions: '='
        },
        link: function ($scope) {

          $scope.metaOptions = {};
          $scope.metaOptions.current_page = 0;
          $scope.numberElements = Pagination.getValues().number_elements;
          $scope.initialIndex = 0;

          $scope.pageNumber = function (iterator) {
            return iterator + $scope.metaOptions.current_page;
          };

          $scope.isActive = function (iterator) {
            return ($scope.metaOptions.current_page === $scope.metaOptions.current_page - iterator) ? true : false;
          };

          $scope.isFirstPage = function () {
            return ($scope.metaOptions.current_page === 1) ? true : false;
          };

          $scope.isLastPage = function () {
            return ($scope.metaOptions.current_page === $scope.metaOptions.total_pages) ? true : false;
          };

          $scope.previousPage = function () {
            $state.go($state.current.name, {currentPage: $scope.metaOptions.current_page - 1});
          };

          $scope.nextPage = function () {
            $state.go($state.current.name, {currentPage: $scope.metaOptions.current_page + 1});
          };

          $scope.lastPage = function () {
            $state.go($state.current.name, {currentPage: $scope.metaOptions.total_pages});
          };

          $scope.goToPage = function (pageNumber) {
            $state.go($state.current.name, {currentPage: pageNumber});
          };

        }
      };
    });

}());
