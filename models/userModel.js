const expressAsyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

UserSchema.pre('save', (async function(next){
    const user = this
    /*  If pswd hasn't modified, it calls next() 
    to skip the rest of the middleware 
    and continue with saving the document.*/
    if(!user.isModified('password')) return next()
    try {
        const hashed = await bcrypt.hash(user.password, 10)
        if(!hashed) return next(new Error('Could not hash the password'))
        user.password = hashed
        next()
        
    } catch (error) {
        next(error)
        
    }

}))
/* isPasswordMatched to the instances of the Mongoose model. 
This method will be available on all documents created from the model.*/
UserSchema.methods.isPasswordMatched = async function(password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)
module.exports = User