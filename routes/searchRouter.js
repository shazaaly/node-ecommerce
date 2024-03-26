const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchController');

// Define the search route
router.get('/', searchProducts);

module.exports = router;
