'use strict';

module.exports = function (req, res) {
  var route = 'services/sub-categories',
      apiConnection = req.finciero.api;

  apiConnection.apiGet(route).then(function (response) {
    var categories = [];

    response.body.data.forEach(function (data) {
      categories.push({
        id: parseInt(data.id, 10),
        name: data.name
      });
    });
    // sort categories by id
    res.json(categories.sort(function (a, b) {
      return parseInt(a.id, 10) - parseInt(b.id, 10);
    })).status(response.res.statusCode);
  }, function (err) {
    res.json(err).status(500);
  });
};
