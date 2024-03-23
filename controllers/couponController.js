const expressAsyncHandler = require('express-async-handler');
const validateId = require('../utils/validateObjectId');
const Coupon = require('../models/couponModel');

const createCoupon = async (req, res) => {
    const { code , expiryDate, discountPercentage } = req.body;

    // Check if the expiry date string is in the "DD-MM-YYYY HH" format
    if (!/^\d{1,2}-\d{1,2}-\d{4} \d{2}$/.test(expiryDate)) {
        return res.status(400).json({ error: 'Expiry date must be in the format DD-MM-YYYY HH ex. 30-03-2024 11' });
    }

    // Split the expiry date string into day, month, year, and hour
    const [day, month, year, hour] = expiryDate.split(/[- ]/);
    // Create a new Date object
    const expiry = new Date(year, month - 1, day, hour);
    // Check if the expiry date is a valid date and if it's later than the current date
    if (isNaN(expiry) || expiry < new Date()) {
        return res.status(400).json({ error: 'Enter a valid Expiry Date' });
    }

    const coupon = new Coupon({
        code: code.trim().toUpperCase(),
        expiryDate: expiry,
        discountPercentage,
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
const deleteCoupon = async (req, res) => {
    const couponId = req.params.id;
    if (!validateId(couponId)) {
        return res.status(400).json({ error: 'Invalid Coupon Id' });
    }

    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
    }

    const deletedCoupon = await coupon.remove();
    if(!deletedCoupon) {
        return res.status(400).json({ error: 'Coupon could not be deleted' });
    }

    res.status(200).json(deletedCoupon);
}

module.exports =  {
    createCoupon,
    updateCoupon,
    deleteCoupon
} ;