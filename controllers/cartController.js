const expressAsyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Coupon = require('../models/couponModel');
const User = require('../models/userModel');

const addToCart = expressAsyncHandler(async (req, res) => {
    const user = req.user
    // console.log(user)
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { qty, product } = req.body;
    if(qty <= 0) {
        return res.status(400).json({ message: 'Quantity must be more than zero' });
    }
    const productToAdd = await Product.findById(product);
    const availableQty = productToAdd.quantity;
    if (qty > availableQty) {
        return res.status(400).json({ message: 'Quantity not available' });
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
    await User.findByIdAndUpdate(user._id, { cart: cart });
    return res.status(201).json({ message: 'Product added to cart', cart });
})

const getCart = expressAsyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const cart = await Cart.findOne({ user: user._id }).populate('cartItems.product');
    return res.status(200).json(cart);
})

const getCartTotal = expressAsyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const cart = await Cart.findOne({user : user._id}).populate('cartItems.product')
    if(!cart){
        return res.status(404).json({message: 'Cart not found'})
    }
    const total = cart.cartItems.reduce((acc, item) => {
        return acc + (item.product.price * item.qty);
        
    },0)    
    return res.status(200).json({"totla cart price" : total})
})

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
    return res.status(200).json({ message: 'Cart emptied', 'cart' : cart.cartItems });
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
    const user = req.user
    console.log(user)
    const cart = user.cart
    console.log(cart)
    let totalCart = cart.totalCart
    totalCart = totalCart * coupon.discountPercentage / 100;
    return res.status(200).json({ message: 'Coupon applied', totalCart });

})

module.exports = {
    addToCart,
    getCart,
    getCartTotal,
    emptyCart,
    applyCoupon
};
