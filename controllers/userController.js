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

module.exports = createUser