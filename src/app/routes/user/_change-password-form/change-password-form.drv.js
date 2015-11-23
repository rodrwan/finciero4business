(function () {
  'use strict';

  angular.module('finciero.cmp.changePasswordForm')
    .directive('finChangePasswordForm', function (Setting, $rootScope, lodash, $log, FlashMessage, $cacheFactory) {
      return {
        restrict: 'E',
        templateUrl: 'scripts/routes/user/_change-password-form/change-password-form.html',
        scope: {},
        link: function ($scope) {
          $scope.settings = Setting.one();
          $scope.form = {};

          $scope.sendForm = function () {
            var values;

            values = lodash.pick($scope.form, ['current_password', 'password', 'password_confirmation']);

            $scope.settings.patch({user: values})
              .then(function () {
                $rootScope.$emit('change-password-form:update', $scope.form);
                FlashMessage.show('La contraseña ha sido cambiada con éxito.', true);
                $cacheFactory.get('$http').removeAll();
              }, function (err) {
                FlashMessage.show('Lo sentimos, pero ha ocurrido un error.', false);
                $log.error('change-password-form', '> when update password', err);
              });
          };

        }
      };
    });

}());
