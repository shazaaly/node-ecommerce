const expressAsyncHandler = require('express-async-handler');
const validateId = require('../utils/validateObjectId');
const Coupon = require('../models/couponModel');

const createCoupon = expressAsyncHandler(async (req, res) => {

    const { code , expiry, discount } = req.body;

    const coupon = new Coupon({
        code,
        expiry,
        discount,
    });

    const createdCoupon = await coupon.save();
    if(!createdCoupon) {
        return res.status(400).json({ error: 'Coupon could not be created' });
    }

    res.status(201).json(createdCoupon);

})

module.exports = { createCoupon };