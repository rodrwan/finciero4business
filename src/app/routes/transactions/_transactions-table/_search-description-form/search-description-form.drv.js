(function () {
  'use strict';

  angular.module('finciero.cmp.searchDescriptionForm')
    .directive('finSearchDescriptionForm', function ($state, $stateParams, lodash) {
      return {
        restrict: 'E',
        templateUrl: 'app/routes/transactions/_transactions-table/_search-description-form/search-description-form.html',
        scope: {
          showSearch: '='
        },
        link: function ($scope) {
          function sendSearchDescriptionForm () {
            var text = $scope.searchDescriptionForm.text;

            $state.go($state.current.name, {description: text, currentPage: 1});
          }
          function closeButton () {
            $state.go($state.current.name, {description: '', currentPage: 1});
            $scope.showSearch = !$scope.showSearch;
          }

          if (angular.isDefined($stateParams.description) && !lodash.isEmpty($stateParams.description)) {
            $scope.searchDescriptionForm.text = $stateParams.description;
            $scope.showSearch = true;
          }

          $scope.sendSearchDescriptionForm = sendSearchDescriptionForm;
          $scope.closeButton = closeButton;
        }
      };
    });

}());
