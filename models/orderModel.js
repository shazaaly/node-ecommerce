const mongoose = require('mongoose');




const orderSchema = new mongoose.Schema({
    orderItems: [{
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status : {
        type: String,
        default: 'Pending',
        enum : ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
}, {
    timestamps: true



});

module.exports = mongoose.model('Order', orderSchema);