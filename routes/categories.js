'use strict';

var express, router, categoryIndex;

express = require('express');
router = express.Router();

categoryIndex = require('../controllers/categories/index');

/* GET sub_categories */
router.get('/', categoryIndex);



module.exports = router;
