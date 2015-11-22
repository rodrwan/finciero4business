'use strict';

module.exports = function (req, res) {
  var Unknowns, page, query;

  page = req.params.page;
  Unknowns = req.adminPanel.model.Unknowns;
  query = {
    limit: 50,
    offset: 50 * (page - 1)
  };

  Unknowns.findAll(query).then(function (unkowns) {
    res.json(unkowns).status(200);
  }, function (err) {
    res.json({
      error: err
    }).status(400);
  });
};
