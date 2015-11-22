'use strict';

module.exports = function (req, res) {
  console.log(req.params);
  var route = 'services/transactions?filter=categorized_by_admin',
      apiConnection = req.finciero.api;

  apiConnection.apiGet(route).then(function (response) {
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
