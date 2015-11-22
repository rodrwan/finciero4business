'use strict';

module.exports = function (req, res) {
  var apiConnection, route, transactionIds, data;

  apiConnection = req.finciero.api;
  transactionIds = req.body.transactionIds;
  route = 'services/revise-transaction/' + transactionIds;
  data = {};

  apiConnection.apiPost(route, data).then(function (response) {
    res.json({data: response.res.body}).status(response.res.statusCode);
  }, function (err) {
    res.json(err).status(500);
  });
};
