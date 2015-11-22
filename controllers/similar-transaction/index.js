'use strict';

module.exports = function (req, res) {
  var apiConnection, route, date, data;

  apiConnection = req.finciero.api;
  date = req.params.date;
  route = 'services/similar-transactions?date=' + date;

  apiConnection.apiGet(route).then(function (response) {
    res.json([response.res.body]).status(response.res.statusCode);
  }, function (err) {
    res.json(err).status(500);
  });
};
