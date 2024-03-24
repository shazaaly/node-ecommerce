
const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    //product module
    title: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        // required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true
    },
    sold:{
        type:Number,
        default : 0
    },
    discount: {
        type: Number,
    },
    images: {
        type: Array,
    },
    totalRatings : {
        type: Number,
        default : 0
    },
    images : [],
    ratings : [
        {
            stars : Number,
            comment : String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
    
            }
        }
    ],

},     { timestamps: true },
)


const Prouct = mongoose.model('Product', ProductSchema);
module.exports = Prouct;
