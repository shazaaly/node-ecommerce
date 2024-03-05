const User = require('../models/userModel');

const createUser = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error creating user',
            error
        });
    }
}

module.exports = createUser