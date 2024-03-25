const expressAsyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const addToCart = expressAsyncHandler(async (req, res) => {
    const user = req.user
    // console.log(user)
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { qty, product } = req.body;
    if(qt === 0) {
        return res.status(400).json({ message: 'Quantity cannot be zero' });
    }
    if (!qty || !product) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    const productExist = await Product.findById(product);
    if (!productExist) {
        return res.status(404).json({ message: 'Product not found' });
    }
    let cart = await Cart.findOne({ user: user._id });
    if (cart) {
        //check if product exist in cart
        const existingItem = cart.cartItems.find((item) => item.product.toString() === product)
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.cartItems.push({ qty, product});
        }
    } else {
        // If cart does not exist, create a new cart
        cart = new Cart({
            user: user._id,
            cartItems: [{ qty, product }]
        });
    }
    const updatedCart = await cart.save();
    return res.status(201).json({ message: 'Product added to cart', cart: updatedCart });
})

const getCart = expressAsyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const cart = await Cart.findOne({ user: user._id }).populate('cartItems.product');
    return res.status(200).json(cart);
})

module.exports = {
    addToCart,
    getCart
};
