const expressAsyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const addToCart = expressAsyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const {qty, product} = req.body;
    if (!qty || !product) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    


})


module.exports = addToCart;