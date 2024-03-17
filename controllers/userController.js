const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../jwtToken');
const refreshTokenGenerator = require('../refreshToken');
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
        const accessToken = generateToken(user.id);
        const reftreshToken = refreshTokenGenerator(user.id);
        res.cookie('refreshToken', reftreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3,

        })
        res.json({
            "status": 'success',
            "id": user.id,
            "token": accessToken,
            "refreshToken": reftreshToken,
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
    const id = req.params.id
    validateId(id)
    const user = await User.findByIdAndUpdate(id, req.body, { new: true })
    if (!user) {
        throw new Error('User not found')
    }
    res.json(user)
})

const handleRefreshToken = expressAsyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).send('Unauthorized')
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || decoded.id !== user.id) {
            return res.status(401).send('Unauthorized refresh token');
        }
        const accessToken = generateToken(user.id);
        res.json({ accessToken })

    } catch (err) {
        return res.status(401).send('Unauthorized refresh token');
    }


})

const logout = expressAsyncHandler(async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken
    console.log
    if (!accessToken && !refreshToken) {
        return res.status(401).send('Unauthorized')
    }
    else {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.status(200).send('Logged out successfully')

    }

})

const updatePassword = expressAsyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }
    const { _id } = req.user;
    validateId(_id);
    const user = await User.findOne({ _id });
    const password = req.body.password;
    if (!user) {
        throw new Error('User not found');
    }
    if (password) {
        user.password = password;
        await user.save();
        res.status(200).json({
            status: 'success',
            message: 'Password updated successfully',
            user
        });
    }
});

module.exports = {
    createUser,
    loginUserController,
    allUsers,
    getUserById,
    deleteUser,
    updateUser,
    handleRefreshToken,
    logout,
    updatePassword
}; // Export the routes as an object
