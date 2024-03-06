const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const createUser = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            user
        });
    });


const loginUserController = expressAsyncHandler(async(req, res)=>{
    const user = await User.findOne({"email": req.body.email})
    if(!user){
        return res.status(400).send("User not found")
    }
    const matched = await user.isPasswordMatched(req.body.password)
    if(!matched){
        return res.status(400).send("Invalid credentials")
    }else{
        res.json(user)
    
    }
})

module.exports = { createUser, loginUserController }; // Export the routes as an object
