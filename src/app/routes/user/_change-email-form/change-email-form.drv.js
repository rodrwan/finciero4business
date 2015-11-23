(function () {
  'use strict';

  angular.module('finciero.cmp.changeEmailForm')
    .directive('finChangeEmailForm', function (Setting, Session, $log, lodash, $rootScope, FlashMessage, $cacheFactory) {
      return {
        restrict: 'E',
        templateUrl: 'scripts/routes/user/_change-email-form/change-email-form.html',
        scope: {},
        link: function ($scope) {
          $scope.settings = Setting.one();

          $scope.form = {
            current: Session.currentUser.email
          };

          $scope.sendForm = function () {
            var values = {};

            values = lodash.pick($scope.form, ['email']);

            $scope.settings.patch({user: values})
              .then(function () {
                $rootScope.$emit('change-email-form:update', $scope.form);
                FlashMessage.show('El correo electrónico ha sido cambiado con éxito.', true);
                $cacheFactory.get('$http').removeAll();
              }, function (err) {
                FlashMessage.show('Lo sentimos, pero ha ocurrido un error.', false);
                $log.error('change-email-form', '> when update email', err);
              });
          };
        }
      };
    });

}());
