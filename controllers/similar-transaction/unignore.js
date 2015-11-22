'use strict';

module.exports = function (req, res) {
  var apiConnection, route, transactionId;

  apiConnection = req.finciero.api;
  transactionId = req.params.transactionId;
  route = 'services/unignore-transaction/' + transactionId;

  apiConnection.apiPost(route, data).then(function (response) {
    var transactions = [];

    response.body.data.forEach(function (data) {
      transactions.push({
        description: data.description,
        subCategoryId: data.sub_category_id,
        count: data.count
      });
    });

    res.json(transactions).status(response.res.statusCode);
  }, function (err) {
    res.json(err).status(500);
  });
};
