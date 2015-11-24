'use strict';

var PORT, express, logger, cookieParser, bodyParser, routes, transactions, cConstraints,
  categories, app, dotenv, fs, login, session, logout, status, simpleLinks, companies, unknowns,
  similarTransaction;

express = require('express');
logger = require('morgan');
cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
dotenv = require('dotenv');
fs = require('fs');
session = require('client-sessions');

if (fs.existsSync('.env')) {
  dotenv.load();
}

routes = require('./routes/index');
// transactions = require('./routes/transactions');
// categories = require('./routes/categories');
// login = require('./routes/login');
// logout = require('./routes/logout');
// status = require('./routes/status');
// cConstraints = require('./routes/c-constraints');
// simpleLinks = require('./routes/simple-links');
// companies = require('./routes/companies');
// unknowns = require('./routes/unknowns');
// similarTransaction = require('./routes/similar-transaction');

app = express();
PORT = process.env.PORT || 8000;

app.set('port', PORT);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  cookieName: 'session',
  secret: process.env.SECRET,
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 60 * 60 * 1000,
  cookie: {
    path: '/api', // cookie will only be sent to requests under '/api'
    maxAge: 24 * 60 * 60 * 1000, // duration of the cookie in milliseconds, defaults to duration above
    ephemeral: false, // when true, cookie expires when the browser closes
    httpOnly: false, // when true, cookie is not accessible from javascript
    secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
  }
}));

app.use(function (req, res, next) {
  req.finciero = {};
  req.adminPanel = {};

  // req.finciero.api = require('./connection/api');
  // req.adminPanel.model = require('./models');
  next();
});

app.use(function (req, res, next) {
  var query, Users;

  Users = req.adminPanel.model.Users;
  if (req.session && req.session.user) {
    query = {
      where: {
        username: req.session.user.username
      },
      attributes: ['username', 'password']
    };
    Users.findOne(query, {raw: true}).then(function (user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  // refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

// app.use(express.static(path.join(__dirname, 'build')));
app.use('/', express.static('public/build'));
app.use('/', express.static('public/.tmp'));
app.use('/bower_components', express.static('public/bower_components'));

function requireLogin (req, res, next) {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    next();
  }
}

// routes definition
app.use('/', routes);
// app.use('/api/login', login);
// app.use('/api/transactions', transactions);
// app.use('/api/categories', categories);
// app.use('/api/logout', requireLogin, logout);
// app.use('/api/status', requireLogin, status);
// app.use('/api/c-constraints', requireLogin, cConstraints);
// app.use('/api/simple-links', requireLogin, simpleLinks);
// app.use('/api/companies', requireLogin, companies);
// app.use('/api/unknowns', requireLogin, unknowns);
// app.use('/api/similar-transaction', requireLogin, similarTransaction);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (process.env.NODEJS_ENV === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'), function () {
  console.log('Listening on: http://localhost:' + app.get('port'));
});

module.exports = app;
