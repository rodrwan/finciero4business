'use strict';

module.exports = function (req, res) {
  var apiConnection, route, transactionId, data;

  apiConnection = req.finciero.api;
  transactionId = req.body.transactionId;
  route = 'services/ignore-transaction/' + transactionId;
  data = {
    id: transactionId
  };

  apiConnection.apiPost(route, data).then(function (response) {
    res.json({data: {
      status: 'ignored'
    }}).status(response.res.statusCode);
  }, function (err) {
    res.json(err).status(500);
  });
};
