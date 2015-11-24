(function () {
  'use strict';

  angular
    .module('finciero.rte.transactions', [
      'finciero.cmp.accountsSidebar',
      'finciero.cmp.transactionsTable',
      'finciero.flt.commaToDot',
      'finciero.flt.roundNumber',
      'finciero.svc.bankAccount',
      'finciero.svc.pagination',
      'finciero.svc.transactions'
    ])
    .config(function ($stateProvider) {
      $stateProvider
        .state('transactions', {
          url: '/transactions',
          templateUrl: 'app/routes/transactions/transactions.html',
          controller: 'TransactionsCtrl',
          resolve: {
            bankAccountResolve: function (BankAccount) {
              return BankAccount;
            },
            transactionsResolve: function (Transaction, Pagination, $stateParams) {
              var pagination = Pagination.getValues($stateParams);
              return Transaction.getData();
            }
          },
          data: {
            requiresLogin: true
          }
        });
    });
}());
