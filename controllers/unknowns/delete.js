'use strict';

module.exports = function (req, res) {
  var query, Unknowns;

  Unknowns = req.adminPanel.model.Unknowns;
  query = {
    where: {
      id: req.params.unknownId
    }
  };

  Unknowns.find(query, {raw: true}).then(function (unknown) {
    return unknown.destroy();
  }).then(function () {
    res.sendStatus(200);
  }, function (err) {
    res.json({
      error: err
    }).status(400);
  });
};
