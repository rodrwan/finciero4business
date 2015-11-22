(function () {
  'use strict';

  angular.module('finciero.adminPanel.rte.categorize.pageInput')
  .directive('pageInput', function (Transactions, Flash) {
    return {
      restrict: 'E',
      controller: function ($rootScope, $scope) {
        $scope.searchPage = function (e) {
          var page;

          if (e.keyCode === 13) {
            page = parseInt($scope.page, 10) - 1;

            if (!isNaN(page)) {
              Transactions.one(page).getList().then(function (trans) {
                $rootScope.$emit('loadingShow', true);
                $rootScope.$emit('updateTransaction', [trans, page]);
              });
            }
          }
        };

        $scope.goToPage = function () {
          var page = parseInt($scope.page, 10) - 1;

          if (!isNaN(page)) {
            Transactions.one(page).getList().then(function (trans) {
              $rootScope.$emit('loadingShow', true);
              $rootScope.$emit('updateTransaction', [trans, page]);
            });
          } else {
            Flash.create('warning', 'You must enter a page number.');
          }
        };
      },
      scope: {
        page: '='
      },
      templateUrl: 'app/routes/categorize/page-input/page-input.html'
    };
  });
})();
