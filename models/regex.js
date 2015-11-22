'use strict';
module.exports = function (sequelize, DataTypes) {
  var Regex = sequelize.define('Regex', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING,
    regex: DataTypes.STRING
  }, {
    tableName: 'regex'
  });

  Regex.sync({alter: true}).then(function (result) {
    console.log(result);
  }, function (err) {
    console.log(err);
  });

  return Regex;
};
