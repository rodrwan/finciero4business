'use strict';

var express, router, showUser;

express = require('express');
router = express.Router();
showUser = require('../controllers/users/show');

/* POST home page. */
router.post('/', showUser);

module.exports = router;
