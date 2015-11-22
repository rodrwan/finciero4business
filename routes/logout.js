'use strict';

var express, router;

express = require('express');
router = express.Router();

router.get('/', function (req, res) {
  console.log('logged out');
  req.session.reset();
  res.json([{status: 'logged out'}]).status(200);
});

module.exports = router;
