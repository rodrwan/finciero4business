'use strict';

module.exports = function (req, res) {
  var Regex = req.adminPanel.model.Regex;

  Regex.create({
    description: req.body.data.description,
    regex: req.body.data.regex
  }).then(function () {
    res.sendStatus(201);
  }, function (err) {
    console.log('error on insert');
    res.json({
      data: err
    }).status(400);
  });
};
