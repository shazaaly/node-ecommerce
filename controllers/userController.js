const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../jwtToken');
const validateId = require('../utils/validateObjectId');
/* register */
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

/*login*/
const loginUserController = expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ "email": req.body.email })
    if (!user) {
        return res.status(400).send("User not found")
    }
    const matched = await user.isPasswordMatched(req.body.password)
    if (!matched) {
        return res.status(400).send("Invalid credentials")
    } else {
        let token = generateToken(user.id);
        res.json({
            "status": 'success',
            "id": user.id,
            "token": token,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "mobile": user.mobile,
            "email": user.email,
            "password": user.password,
        })

    }
})

// get all users 
const allUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find()
    res.json(users)

    if (!users) {
        throw new Error(err.message);
    }
})

const getUserById = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    validateId(id)
    const user = await User.findById(id)
    if (!user) {
        throw new Error('User not found')
    }
    res.json(user)
})

const deleteUser = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    validateId(id)
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        throw new Error('User not found')
    }
    res.json(user)
})
const updateUser = expressAsyncHandler(async (req, res) => {
    const id  = req.params.id
    validateId(id)
    const user = await User.findByIdAndUpdate(id, req.body, { new: true })
    if (!user) {
        throw new Error('User not found')
    }
    res.json(user)
})

module.exports = {
    createUser,
    loginUserController,
    allUsers, getUserById,
    deleteUser, updateUser
}; // Export the routes as an object
