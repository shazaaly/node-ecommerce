const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
jwt = require('jsonwebtoken')

/* set req.user to the authenticated user */
const authMiddleware = expressAsyncHandler(async(req, res, next) => { 
    if(req.headers.authorization?.startsWith('Bearer')){
        let token = req.headers.authorization.split(' ')[1]
        if(token){
            let decoded  = jwt.verify(token, process.env.JWT_SECRET)
            const authenticatedUser = await User.findById(decoded.id)
            req.user = authenticatedUser
            next()
        }else{
            throw new Error('Token not found')
        }

    }else{
        throw new Error('Token not found')
    }
})
/* check if the user is an admin */
const isAdmin = expressAsyncHandler(async(req, res, next)=>{
    const {email} = req.user
    const user = await User.findOne({email})
    if(user.role === 'admin'){
        next()
    }else{
        throw new Error('Unauthorized')
    }
})

module.exports = {authMiddleware, isAdmin}