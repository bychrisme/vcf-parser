const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/contact.controller');


// a simple test url to check that all of our files are communicating correctly.
router.post('/vcf', product_controller.vcfParse);

module.exports = router;