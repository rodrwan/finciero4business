'use strict';

module.exports = function (req, res) {
  var route, apiConnection, data;

  apiConnection = req.finciero.api;
  route = 'services/simple-links';
  data = req.body;

  apiConnection.apiPost(route, data).then(function (response) {
    res.status(response.res.statusCode).json(response.body.data);
  }, function (err) {
    res.status(500).json({error: err});
  });
};
