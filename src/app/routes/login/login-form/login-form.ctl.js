(function () {
  'use strict';

  angular.module('finciero.business.login.drv.fbLoginForm')
  .directive('fbLoginForm', function ($rootScope, Session, Flash, $state, store) {
    return {
      restrict: 'E',
      templateUrl: 'app/routes/login/login-form/login-form.html',
      scope: {},
      link: function ($scope) {
        function sendForm () {
          var formatted = {
            user: {
              email: $scope.login.email,
              password: $scope.login.password
            }
          };

          $scope.isLoading = true;
          store.set('session', formatted);
          $state.go('dashboard');
          // Session.resource.post(formatted).then(function (response) {
          //   Session.setSession(response.token, response.meta.user);
          //   Socket.connect();

          //   if (response.meta.user.step === 'first_bank_account') {
          //     $state.go('first-run.first-account');
          //   } else if (response.meta.user.step === 'first_scraping') {
          //     $state.go('first-run.finish');
          //   } else {
          //     $state.go('dashboard');
          //   }
          // }, function (err) {
          //   $scope.isLoading = false;
          //   if (err.status === 422) {
          //     FlashMessage.show('Lo sentimos, pero su usuario o contraseña son incorrectos.', false);
          //   }
          //   $log.error('login', '> when login to finciero', err);
          // });
        }

        $scope.login = {};
        $scope.login.email = 'demo@finciero.com';
        $scope.login.password = 'demo2015';
        $scope.sendForm = sendForm;
        $scope.isLoading = false;
      }
    };
  });
})();
