'use strict';

var express, router, transactionIndex, transactionAdmin, transactionPage, transactionCategorize,
  transactionAdminPage;

express = require('express');
router = express.Router();
transactionIndex = require('../controllers/transactions/index');
transactionAdmin = require('../controllers/transactions/show-admin');
transactionAdminPage = require('../controllers/transactions/admin-page');
transactionPage = require('../controllers/transactions/page');
transactionCategorize = require('../controllers/transactions/categorize');

/* GET transactions grouped by description and sub_category_id first page. */
router.get('/', transactionIndex);

/* GET transactions categorized by admin. */
router.get('/admin', transactionAdmin);

/* GET transactions categorized by admin page. */
router.get('/admin/:page', transactionAdminPage);

/* GET transactions grouped by description and sub_category_id pages. */
router.get('/:page', transactionPage);

/* POST categorize transacion */
router.post('/categorize', transactionCategorize);

module.exports = router;
