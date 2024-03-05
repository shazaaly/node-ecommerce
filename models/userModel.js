const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})


const User = mongoose.model('User', UserSchema)
module.exports = User