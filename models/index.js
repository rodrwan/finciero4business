'use strict';

var fs, path, Sequelize, env, config, sequelize, db;

fs = require('fs');
path = require('path');
Sequelize = require('sequelize');
env = process.env.NODE_ENV || 'development';
config = require(__dirname + '/../config/config.json')[env];

if (process.env.NODEJS_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true //false
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    var model;

    if (file.slice(-3) !== '.js') {
      return;
    }

    model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
