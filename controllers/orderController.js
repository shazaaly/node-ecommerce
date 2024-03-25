const Order = require('../models/orderModel');
const User = require('../models/userModel'); // Changed 'user' to 'User'
const Product = require('../models/productModel');
const expressAsyncHandler = require('express-async-handler');

// helper fn to calc total order price
const totalOrderPrice = (orderItems) => {
    return orderItems.reduce((acc, item)=>{
        return  parseInt(acc + item.qty * item.price)
    }, 0)


}
const createOrder = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
        res.status(400).send({ message: 'No order items' });
        return; 
    }
    if (!shippingAddress || !paymentMethod || !shippingPrice || !totalPrice) {
        res.status(400);
        throw new Error('Order fields must be filled');
    }
    const calcTotalPrice = totalOrderPrice(orderItems); // Call the function with orderItems

    const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        totalPrice : calcTotalPrice,
        user: user._id
    });
    await order.save();
    return res.status(201).json({ message: 'Order created', order });
})

module.exports = { createOrder }