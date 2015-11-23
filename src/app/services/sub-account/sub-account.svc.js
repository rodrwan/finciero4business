(function () {
  'use strict';

  angular.module('finciero.svc.subAccount')
    .factory('SubAccount', function (lodash, Restangular, BankAccount, Transaction) {

      var bankAccounts = BankAccount.getList().$object;

      Restangular.extendCollection('sub_accounts', function (collection) {
        collection.getAssetsAccounts = function () {
          return lodash.filter(collection, {statement: 'asset'});
        };
        collection.getLiabilitiesAccounts = function () {
          return lodash.filter(collection, {statement: 'liability'});
        };

        return collection;
      });

      Restangular.extendModel('sub_accounts', function (model) {
        model.transactions = function (pagination) {
          return Transaction.compoundService(model, pagination);
        };
        model.getBankAccountName = function () {
          if (lodash.isEmpty(bankAccounts)) {
            return undefined;
          }
          return lodash.find(bankAccounts, {id: model.bank_account_id}).title;
        };
        model.getCompoundName = function () {
          var name = model.name;
          if (model.currency === 'international') {
            name += ' Int';
          }
          name += '* ' + model.vanity_id;
          return name;
        };

        return model;
      });

      return Restangular.service('sub_accounts');
    });

}());
