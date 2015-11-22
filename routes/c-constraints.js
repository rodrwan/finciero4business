'use strict';

var express, router, createCconstraints, indexCconstraints, deleteCconstraints;

express = require('express');
router = express.Router();
createCconstraints = require('../controllers/c-constraints/create');
indexCconstraints = require('../controllers/c-constraints/index');
deleteCconstraints = require('../controllers/c-constraints/delete');

router.post('/', createCconstraints);
router.get('/', indexCconstraints);
router.delete('/:description', deleteCconstraints);

module.exports = router;
