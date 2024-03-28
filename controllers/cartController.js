const expressAsyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Coupon = require('../models/couponModel');
const User = require('../models/userModel');

const addToCart = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { qty, product } = req.body;
    if (!qty || !product || qty <= 0) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    const productToAdd = await Product.findById(product);
    if (!productToAdd || qty > productToAdd.qty) {
        return res.status(404).json({ message: 'Product not found or quantity not available' });
    }

    let cart = await Cart.findOne({ user: user._id });
    if (cart) {
        // Check if product exists in cart
        const existingItem = cart.cartItems.find(item => item.product.toString() === product);
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            // cart.cartItems.push({ qty, product });
            user.cart.push({ qty, product });
        }
        await user.save(); // Save changes to the user

    } else {
        // If cart does not exist, create a new cart
        cart = new Cart({
            user: user._id,
            cartItems: [{ qty, product }]
        });
    }

    await cart.save(); // Save changes to the cart
    console.log(user.cart);

    const updatedCart = await Cart.findOne({ user: user._id }).populate('cartItems.product');
    console.log(user.cart);
    return res.status(201).json({ message: 'Product added to cart', cart: updatedCart });
});

const getCart = expressAsyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const cart = await Cart.findOne({ user: user._id }).populate('cartItems.product');
    return res.status(200).json(cart);
})

const getCartTotal = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const userId = user._id.toString();
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    // total price of all items in the cart
    // loop cart items
    let cartTotal = 0;

    for (let item of cart.cartItems) {
        const prodId = item.product.toString()
        const product = await Product.findById(prodId)
        const price = product.price;
        const qty = item.qty;
        const itemTotal = price * qty;
        cartTotal += itemTotal;
    }


    return res.status(200).json({ "total cart price": cartTotal });
});

const emptyCart = expressAsyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    cart.cartItems = [];
    await cart.save();
    return res.status(200).json({ message: 'Cart emptied', 'cart': cart.cartItems });
})

const applyCoupon = expressAsyncHandler(async (req, res) => {
    const coupon = req.body.code;
    if (!coupon) {
        return res.status(400).json({ message: 'Coupon code is required' });
    }
    const validCoupon = await Coupon.findOne({ code: coupon });
    if (!validCoupon || validCoupon.expiryDate < new Date()) {
        return res.status(404).json({ message: 'Please Enter a valid coupon!' });
    }
    const user = req.user;
    const cart = user.cart;
    console.log(cart);
    console.log(user);

    // Calculate totalCart here
    let totalCart = 0;
    for (let item of cart[0].cartItems) {
        const prodId = item.product.toString();
        const product = await Product.findById(prodId);
        totalCart += parseFloat((product.price * product.quantity).toFixed(2));

    }

    // Apply the discount
    totalCart = totalCart * (1 - validCoupon.discountPercentage / 100);

    return res.status(200).json({ message: 'Coupon applied', totalCart });
});

module.exports = {
    addToCart,
    getCart,
    getCartTotal,
    emptyCart,
    applyCoupon
};
