'use strict';

module.exports = function (sequelize, DataTypes) {
  var Unknowns = sequelize.define('Unknowns', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING,
    count: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    tableName: 'unknown'
  });

  Unknowns.sync({alter: true}).then(function (result) {
    console.log(result);
  }, function (err) {
    console.log(err);
  });

  return Unknowns;
};
