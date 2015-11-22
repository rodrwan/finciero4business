'use strict';

var express, router, indexCompanies;

express = require('express');
router = express.Router();
indexCompanies = require('../controllers/companies/index');

router.get('/', indexCompanies);

module.exports = router;
