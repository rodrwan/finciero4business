(function () {
  'use strict';

  angular.module('finciero.rte.user')
    .controller('UserInvestmentsCtrl', function ($scope, $mdDialog, $rootScope, InvestmentsResolve, lodash, $moment) {
      function showAddDialog (ev) {
        $mdDialog.show({
          templateUrl: 'scripts/routes/investments/new-investment-dialog.html',
          clickOutsideToClose: true,
          targetEvent: ev
        });
      }

      $scope.investments = InvestmentsResolve;
      $scope.showAddDialog = showAddDialog;

      $rootScope.$on('investments:created', function (event, data) {
        var find = lodash.find($scope.investments, {id: data.id});

        if (angular.isUndefined(find)) {
          $scope.investments.push(data);
        }
      });

      $rootScope.$on('investments:destroyed', function (event, data) {
        $scope.investments.some(function (investment, index) {
          if (investment.id === data.id) {
            $scope.investments.splice(index, 1);
            return true;
          }
          return false;
        });
      });

      $rootScope.$on('investments:updated', function (event, data) {
        var newDatetime = $moment(data.updated_at);
        $scope.investments.some(function (investment, index) {
          var currentDatetime;
          if (investment.id === data.id) {
            currentDatetime = $moment(investment.updated_at);

            if (newDatetime.isAfter(currentDatetime)) {
              lodash.merge($scope.investments[index], data);
            }
            return true;
          }
          return false;
        });
      });
    });

})();
