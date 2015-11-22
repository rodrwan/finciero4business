(function () {
  'use strict';

  angular.module('finciero.adminPanel.rte.categorize')

  .controller('CatCtrl', function HomeController ($rootScope, $scope, $state, $filter, Login, Transactions, Categories, Unknowns) {
    $scope.categories = [];
    $scope.transactions = [];
    $scope.cconstraints = [];
    $scope.currentPage = 0;
    $scope.orderProp = 'count';
    $scope.direction = true;
    $scope.loading = true;

    function filterTransactions (transactions, removeTransactions) {
      removeTransactions.forEach(function (rt) {
        transactions = transactions.filter(function (t) {
          return t.description !== rt.description && t.count !== rt.count &&
            t.subCategoryId !== rt.categoryId;
        });
      });
      return transactions;
    }

    Categories.getList().then(function (cats) {
      cats.forEach(function (value, idx) {
        if ((idx + 1) === 112) {
          $scope.categories.push({
            id: 112,
            name: 'Wrong category'
          });
        }
        if ((idx + 1) === 124) {
          $scope.categories.push({
            id: 124,
            name: 'Wrong category'
          });
        }
        $scope.categories.push({
          id: value.id,
          name: value.name
        });
      });
    });

    Unknowns.getList().then(function (unknowns) {
      Transactions.getList().then(function (transactions) {
        $scope.transactions = filterTransactions(transactions, unknowns);
        $scope.loading = false;
      });
    }, function () {
      Transactions.getList().then(function (transactions) {
        $scope.transactions = transactions;
        $scope.loading = false;
      });
    });


    $scope.nextPage = function () {
      $rootScope.$emit('loadingShow', true);
      $scope.loading = true;
      $scope.currentPage += 1;
      $scope.transactions = [];

      Transactions.one($scope.currentPage).getList().then(function (trans) {
        trans.forEach(function (value) {
          $scope.transactions.push(value);
          $scope.loading = false;
        });
      });
    };

    $scope.prevPage = function () {
      $scope.currentPage -= 1;
      $scope.transactions = [];
      Transactions.one($scope.currentPage).getList().then(function (trans) {
        trans.forEach(function (value) {
          $scope.transactions.push(value);
          $scope.subCategoryId.push(value.sub_category_id);
        });
      });
    };

    $scope.sort = function (column) {
      if ($scope.orderProp === column) {
        $scope.direction = !$scope.direction;
      } else {
        $scope.orderProp = column;
        $scope.direction = false;
      }
    };

    $rootScope.$on('updateTransaction', function (event, transactions) {
      $scope.transactions = transactions[0];
      $scope.currentPage = transactions[1];
      $scope.loading = false;
    });

    $rootScope.$on('loadingShow', function (e, value) {
      $scope.loading = value;
    });

    $scope.$on('updateTransaction', function (event, transactions) {
      $scope.transactions = transactions;
    });

    $scope.$watch('transactions', function (newValue) {
      $scope.transactions = newValue;
      console.log('update transaction table');
    });
  });
})();
