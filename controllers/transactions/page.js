'use strict';


module.exports = function (req, res) {
  var page = parseInt(req.params.page, 10),
      route = 'services/transactions?filter=autocategorized&page=' + page,
      apiConnection = req.finciero.api;

  if (isNaN(page)) {
    res.json({
      error: 'Wrong url parameter.'
    });
  } else {
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
  }
};
