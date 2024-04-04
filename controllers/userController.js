const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../jwtToken');
const refreshTokenGenerator = require('../refreshToken');
const validateId = require('../utils/validateObjectId');
const sendMail = require('../controllers/emailController');
const crypto = require('crypto')
/* register */
const createUser = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const user = await User.create(req.body);
    res.status(201).json({
        user
    });
});

/*login*/
const loginUser = expressAsyncHandler(async (req, res) => {
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
    const user = await User.findOne({ _id });
    const password = req.body.password;
    if (!user) {
        throw new Error('User not found');
    }
    if (password) {
        user.password = password;
        await user.save();
        res.status(200).json({
            message: 'Password updated successfully',
            user
        });
    }
});

const forgetPasswordToken = async (req, res) => {
    const { to } = req.body;
    const emailToLower = to.toLowerCase();

    try {
        const user = await User.findOne({ email: emailToLower });

        if (!user) {
            return res.status(400).json({ message: 'No user found with this email address' });
        }

        const token = user.createPasswordResetToken();
        await user.save();

        await sendMail({
            from: process.env.EMAIL,
            to: to,
            subject: "Reset Password",
            text: `Use the following link to reset your password ${process.env.TEST_URL}/reset-password/${token}`
        });

        return res.status(200).json({ message: 'Password reset email sent successfully.' });
    } catch (error) {
        console.error("Error during forgetPasswordToken operation:", error);
        return res.status(500).json({ message: error.message });
    }
};

const resetPassword = expressAsyncHandler(async (req, res) => {
    const token = req.params.token
    // const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    console.log(token)
    // console.log(hashedToken)
    const user = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() }
    })
    console.log('user:', user);
    if (!user) {
        return res.status(400).send('Invalid token')
    }
    const password = req.body.password
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.json( user )

})

const getUserWishList = expressAsyncHandler(async (req, res) => {
    // /user/id/wishlist
    const { id } = req.user;
    const user = await User.findById(id).populate('wishlist')
    if (!user) {
        return res.status(400).send('User not found')
    }
    return res.json(user.wishlist)


})

const adminLogin = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        return res.status(400).send('User not found')
    }
    const matched = await user.isPasswordMatched(password)
    if (!matched) {

        return res.status(400).send('Invalid credentials')
    }
    if(user.role !== 'admin'){
        return res.status(400).send('User not authorized')
    }
    try {
        const accessToken = generateToken(user.id);
        const refreshToken = refreshTokenGenerator(user.id);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3,
    
        })
        res.json({
            "message": 'Admin login successfull',
            "id": user.id,
            "token": accessToken,
            "refreshToken": refreshToken,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "mobile": user.mobile,
            "email": user.email,
            "password": user.password,
            "role" : user.role
        })
        
    } catch (error) {
        return res.status(400).send('Error')
        
    }
})
const adminLogOut = expressAsyncHandler(async (req, res, next) => {
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


module.exports = {
    createUser,
    loginUser,
    allUsers,
    getUserById,
    deleteUser,
    updateUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgetPasswordToken,
    resetPassword,
    getUserWishList,
    adminLogin,
    adminLogOut
}; // Export the routes as an object
