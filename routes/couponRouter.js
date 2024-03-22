const express = require('express');
const {
    createCoupon, 
    updateCoupon
} = require('../controllers/couponController');
const authMiddleware = require('../middlewares/authorizationMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createCoupon);
router.put('/update', authMiddleware, updateCoupon);

module.exports = router;