'use strict';

module.exports = function (req, res) {
  var Unknowns = req.adminPanel.model.Unknowns;

  Unknowns.findAll().then(function (unknowns) {
    res.json(unknowns).status(200);
  }, function (err) {
    res.json({
      error: err
    }).status(400);
  });
};
