(function () {
  'use strict';

  angular.module('finciero.cmp.widgetTableContainer')
    .directive('finWidgetTableContainer', function ($log, FlashMessage, Transaction) {
      return {
        restrict: 'E',
        templateUrl: function ($element, $attrs) {
          if (angular.isUndefined($attrs.type)) {
            throw new Error('Param type is not defined');
          }
          return 'app/routes/dashboard/_widget-table-container/widget-table-container-' + $attrs.type + '.html';
        },
        replace: true,
        scope: {},
        link: function ($scope, $element, $attrs) {
          function getTransactionsValues () {
            var options = {
              per_page: 5
            };
            Transaction.getData(5).then(function (data) {
              $scope.transactions = data;
              $scope.isLoading = true;
            }, function (err) {
              FlashMessage.show('Lo sentimos, pero ha ocurrido un error al cargar las transacciones.', false);
              $log.error('widget-container:transactions', err);
            });
          }

          $scope.isLoading = false;

          if ($attrs.type === 'transactions') {
            getTransactionsValues();
          }
        }
      };
    });

}());
