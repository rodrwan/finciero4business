'use strict';

var express, router;

express = require('express');
router = express.Router();

router.get('/', function (req, res) {
  if (req.session) {
    res.json();
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
