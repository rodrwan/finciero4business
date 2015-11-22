'use strict';

module.exports = function (sequelize, DataTypes) {
  var cConstraints = sequelize.define('CConstraints', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING,
    count: DataTypes.INTEGER,
    added: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'c_constraints'
  });

  cConstraints.sync({alter: true}).then(function (result) {
    console.log(result);
  }, function (err) {
    console.log(err);
  });

  return cConstraints;
};
