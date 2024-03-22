const express = require('express');
const {
    createCoupon, 
    updateCoupon
} = require('../controllers/couponController');

const {authMiddleware, isAdmin} = require('../middlewares/authorizationMiddleware');
const router = express.Router();

router.post('/create', createCoupon);
router.put('/update', updateCoupon);

module.exports = router;