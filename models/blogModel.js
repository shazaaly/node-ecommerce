const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    numViews: {
        type: Number,
        default: 0
    },
    numLikes: {
        type: Number,
        default: 0
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    image:{
        type: String,
        default: "https://ibb.co/2sY9nwj"
    },
    author:{
        type: String,
        default: "Admin"
    }
}, 
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);