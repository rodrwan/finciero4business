'use strict';

module.exports = function (req, res) {
  var route, apiConnection;

  apiConnection = req.finciero.api;
  route = 'services/companies';

  apiConnection.apiGet(route).then(function (response) {
    res.status(response.res.statusCode).json(response.body.data);
  }, function (err) {
    res.status(500).json({error: err});
  });
};
