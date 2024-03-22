const expressAsyncHandler = require('express-async-handler');
const validateId = require('../utils/validateObjectId');
const Coupon = require('../models/couponModel');

const createCoupon = async (req, res) => {

    const { code , expiry, discount } = req.body;
    const expiryDate = new Date(expiry)
    if(expiryDate < new Date() || !expiryDate ||isNaN(expiryDate) ){
        return res.status(400).json({ error: 'Enter a valid Expiry Date' });
    }

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

}

const updateCoupon = async (req, res) => {
    const couponId = req.params.id;
    if (!validateId(couponId)) {
        return res.status(400).json({ error: 'Invalid Coupon Id' });
    }

    const { code , expiry, discount } = req.body;
    const expiryDate = new Date(expiry)
    if(expiryDate < new Date() || !expiryDate ||isNaN(expiryDate) ){
        return res.status(400).json({ error: 'Enter a valid Expiry Date' });
    }

    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
    }

    coupon.code = code;
    coupon.expiry = expiry;
    coupon.discount = discount;

    const updatedCoupon = await coupon.save();
    if(!updatedCoupon) {
        return res.status(400).json({ error: 'Coupon could not be updated' });
    }

    res.status(200).json(updatedCoupon);
}

module.exports =  {
    createCoupon,
    updateCoupon
} ;