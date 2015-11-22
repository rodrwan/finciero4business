'use strict';

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function (value, next) {
          Users.find({
              where: {username: value},
              attributes: ['id']
          })
          .then(function (user) {
            if (user) {
              // We found a user with this email address.
              // Pass the error to the next method.
              return next('Email address already in use!');
            }
            // If we got this far, the email address hasn't been used yet.
            // Call next with no arguments when validation is successful.
            return next();
          })
          .catch(function (error) {
            if (error) {
              // Some unexpected error occured with the find method.
              return next(error);
            }
          });
        }
      }
    },
    password: DataTypes.STRING
  }, {
    tableName: 'users'
  });

  Users.sync({alter: true}).then(function () {
    return Users.create({
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    });
  })
  .then(function () {
    console.log('ok');
  })
  .catch(function (err) {
    // respond with validation errors
    console.log(err.errors);
  })
  .catch(function (err) {
    // every other error
    console.log(err.message);
  });

  return Users;
};
