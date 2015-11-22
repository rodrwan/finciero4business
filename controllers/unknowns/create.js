'use strict';

module.exports = function (req, res) {
  var query, Unknowns;

  Unknowns = req.adminPanel.model.Unknowns;
  query = {
    where: {
      description: req.body.description,
      count: req.body.count,
      categoryId: req.body.category
    },
    attributes: ['id', 'description', 'count', 'categoryId']
  };

  Unknowns.find(query, {raw: true}).then(function (unknown) {
    if (!unknown) {
      Unknowns.create({
        description: query.where.description,
        count: query.where.count,
        categoryId: query.where.categoryId
      }).then(function () {
        res.sendStatus(201);
      }, function (err) {
        res.json({
          error: err
        }).status(400);
      });
    } else {
      res.json({
        data: 'Transaction already exist.'
      }).status(200);
    }
  }, function (err) {
    res.json({
      error: err
    }).status(400);
  });
};
