'use strict';

module.exports = function (req, res) {
  var route, apiConnection;

  apiConnection = req.finciero.api;
  route = 'services/simple-links/' + req.params.simpleLinkId;

  apiConnection.apiDelete(route).then(function (response) {
    res.status(response.res.statusCode).json(response.body.data);
  }, function (err) {
    res.status(500).json({error: err});
  });
};
