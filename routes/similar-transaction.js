'use strict';

var express, router, similarTransactionIndex, similarTransctionIgnore, similarTransctionRevise;

express = require('express');
router = express.Router();
similarTransactionIndex = require('../controllers/similar-transaction/index');
similarTransctionIgnore = require('../controllers/similar-transaction/ignore');
similarTransctionRevise = require('../controllers/similar-transaction/revise');

router.get('/:date', similarTransactionIndex);
router.post('/ignore', similarTransctionIgnore);
router.post('/revise', similarTransctionRevise);
module.exports = router;
