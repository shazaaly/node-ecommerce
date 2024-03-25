const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/authorizationMiddleware');
const {createOrder, changeOrderStatus} = require('../controllers/orderController');

router.post('/create', authMiddleware, createOrder)
router.post('/:id/order-status', authMiddleware, changeOrderStatus)


module.exports = router; // Export the router