'use strict';

module.exports = function (req, res) {
  var query, cConstraints;

  cConstraints = req.adminPanel.model.CConstraints;
  query = {
    where: {
      description: req.body.description,
      added: false
    },
    attributes: ['id', 'description', 'count']
  };

  cConstraints.find(query, {raw: true}).then(function (cConstraint) {
    if (cConstraint) {
      cConstraint.updateAttributes({
        count: cConstraint.count + 1
      }).then(function () {
        res.sendStatus(200);
      }, function (err) {
        res.json({
          data: err
        }).status(400);
      });
    } else {
      cConstraints.create({
        description: query.where.description,
        count: 1
      }).then(function () {
        res.sendStatus(201);
      }, function (err) {
        res.json({
          data: err
        }).status(400);
      });
    }
  }, function (err) {
    res.json({
      data: err
    }).status(400);
  });
};
