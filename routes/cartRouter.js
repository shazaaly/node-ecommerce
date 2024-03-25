const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/authorizationMiddleware');
const { addToCart, getCart, getCartTotal } = require('../controllers/cartController');

router.post('/add', authMiddleware, addToCart);
router.get('/cart-total', authMiddleware, getCartTotal);
router.get('/', authMiddleware, getCart);


module.exports = router;