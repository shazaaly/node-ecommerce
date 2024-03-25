const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    cartItems: [{
        qty: { type: Number, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true


})

cartSchema.virtual('cartTotal').get(function() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.qty * item.price);
    }, 0);
  });

module.exports = mongoose.model('Cart', cartSchema);