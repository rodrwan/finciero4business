(function () {
  'use strict';

  angular
    .module('finciero.cmp.transactionsTable', [
      'finciero.cmp.searchDescriptionForm',
      'finciero.cmp.dropdown',
      'finciero.cmp.editTransaction',
      'finciero.cmp.ignoreTransactionButton',
      'finciero.cmp.pagination',
      'finciero.cmp.sortOptions',
      'finciero.cmp.transactionSelectCategory',
      'finciero.svc.category',
      'finciero.flt.commaToDot',
      'ngLodash',
      'slyRepeat',
      'slyEvaluate'
    ]);

}());
