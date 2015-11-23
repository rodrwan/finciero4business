(function () {
  'use strict';

  angular.module('finciero.rte.bankAccounts', [
    'finciero.cmp.accountsSidebar',
    'finciero.cmp.navbar',
    'finciero.cmp.transactionsTable',
    'finciero.flt.commaToDot',
    'finciero.flt.roundNumber',
    'finciero.svc.bankAccount',
    'ngLodash'
  ])

  .config(function ($stateProvider) {
    $stateProvider
      .state('bank-accounts', {
        abstract: true,
        url: '/bank-accounts',
        templateUrl: 'app/routes/bank-accounts/bank-accounts.html',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        }
      })
      .state('bank-accounts.transactions', {
        url: '/:id/transactions?currentPage&perPage',
        controller: 'BankAccountsTransactionsCtrl',
        templateUrl: 'app/routes/bank-accounts/bank-accounts-transactions.html',
        resolve: {
          transactionsResolve: function (Transaction, $stateParams, Pagination, lodash) {
            var options = {};
            options = lodash.assign(options, Pagination.getValues($stateParams));
            options.bank_account_ids = $stateParams.id;
            return Transaction.resource.getList(options);
          },
          bankAccountResolve: function (BankAccount, $stateParams) {
            return BankAccount.one($stateParams.id).get();
          }
        }
      });
  });

})();

