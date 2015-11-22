'use strict';

module.exports = function (req, res) {
  var query, cConstraints;

  cConstraints = req.adminPanel.model.CConstraints;
  query = {
    where: {
      description: req.params.description
    }
  };

  cConstraints.find(query, {raw: true}).then(function (constraints) {
    return constraints.destroy();
  }).then(function () {
    res.sendStatus(200);
  }, function (err) {
    res.json({
      data: err
    }).status(400);
  });
};
