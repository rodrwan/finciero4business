'use strict';

var express, router, indexUnknowns, indexUnknownsPage, createUnknowns, deleteUnknowns;

express = require('express');
router = express.Router();
indexUnknowns = require('../controllers/unknowns/index');
indexUnknownsPage = require('../controllers/unknowns/index-page');
createUnknowns = require('../controllers/unknowns/create');
deleteUnknowns = require('../controllers/unknowns/delete');

/* first page of unknown transactions */
router.get('/', indexUnknowns);

/* next page of unknown transactions */
router.get('/:page', indexUnknownsPage);

/* create unknown transacion */
router.post('/', createUnknowns);

/* delete unknown transaction */
router.delete('/:unknownId', deleteUnknowns);

module.exports = router;
