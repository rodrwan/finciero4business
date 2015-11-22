'use strict';

module.exports = function (req, res) {
  var route = 'services/categorize-transactions',
      transaction = req.body,
      apiConnection = req.finciero.api;

  console.log('updating transaction');
  console.log(transaction);

  apiConnection.apiPost(route, transaction).then(function (response) {
    if (response.res.statusCode === 201) {
      res.json(response.body).status(response.res.statusCode);
    } else {
      res.json(response.body).status(response.res.statusCode);
    }
  }, function (err) {
    res.json(err).status(500);
  });
};
