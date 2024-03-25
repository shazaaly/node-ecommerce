const expressAsyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const addToCart = expressAsyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { qty, product } = req.body;
    if (!qty || !product) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    const _id = product._id
    if (!_id) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    const productExist = await Product.findById(_id);
    if (!productExist) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const cart = await Cart.findOne({ user: user._id });
    if (cart) {
        //check if product exist in cart
        const existingItem = cart.cartItems.find((item) => item.product === _id)
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.cartItems.push({ qty, product: _id });
        }
        const updatedCart = await cart.save();
        return res.status(201).json({ message: 'Product added to cart', cart: updatedCart });
    }

})


module.exports = addToCart;