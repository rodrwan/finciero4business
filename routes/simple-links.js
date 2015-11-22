'use strict';

var express, router, indexSimpleLinks, deleteSimpleLinks, createSimpleLink;

express = require('express');
router = express.Router();
indexSimpleLinks = require('../controllers/simple-links/index');
deleteSimpleLinks = require('../controllers/simple-links/delete');
createSimpleLink = require('../controllers/simple-links/create');

router.get('/', indexSimpleLinks);
router.delete('/:simpleLinkId', deleteSimpleLinks);
router.post('/', createSimpleLink);

module.exports = router;
