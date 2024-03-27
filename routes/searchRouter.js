const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchController');

// Define the search route
router.post('/', searchProducts);

module.exports = router;
