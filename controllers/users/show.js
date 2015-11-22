'use strict';

var crypto;

crypto = require('crypto');

module.exports = function (req, res) {
  var UserModel, query;

  UserModel = req.adminPanel.model.Users;
  query = {
    where: {
      username: req.body.username
    },
    attributes: ['username', 'password']
  };
  UserModel.findOne(query, {raw: true}).then(function (user) {
    var shasum, tokenString, username, password;

    username = req.body.username;
    password = req.body.password;
    shasum = crypto.createHash('sha256');
    tokenString = JSON.stringify(user) + new Date().toJSON();

    if (username === user.username && password === user.password) {
      shasum.update(tokenString);
      req.session.user = {
        username: user.username,
        password: user.password,
        token: shasum.digest('hex')
      };

      res.json({
        username: user.username,
        token: req.session.user.token
      }).status(200);
    } else {
      res.sendStatus(401);
    }
  }, function (err) {
    res.json({error: err}).status(500);
  });
};
