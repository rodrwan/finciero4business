'use strict';

module.exports = function (req, res) {
  var cConstraints = req.adminPanel.model.CConstraints;

  cConstraints.findAll().then(function (constraints) {
    res.json(constraints).status(200);
  }, function (err) {
    res.json({
      error: err
    }).status(400);
  });
};
