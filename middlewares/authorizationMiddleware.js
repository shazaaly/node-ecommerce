
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
jwt = require('jsonwebtoken')

/* set req.user to the authenticated user */
const authMiddleware = async(req, res, next) => { 
    if(req.headers.authorization?.startsWith('Bearer')){
        let token = req.headers.authorization.split(' ')[1]
        if(token){
            try {
                let decoded  = jwt.verify(token, process.env.JWT_SECRET)
                const authenticatedUser = await User.findById(decoded.id)
                req.user = authenticatedUser
                next()
            } catch (error) {
                res.status(401);
                throw new Error('Invalid token')
            }
        }else{
            res.status(401);
            throw new Error('Token not found')
        }
    }else{
        res.status(401);
        throw new Error('Token not found')
    }
}
/* check if the user is an admin */
const isAdmin = expressAsyncHandler(async(req, res, next)=>{
    const {email} = req.user
    const user = await User.findOne({email})
    if(user.role === 'admin'){
        next()

    }else{
        throw new Error('Unauthorized, Admin only access!')

    }
})

const blockUser = expressAsyncHandler(async(req, res, next)=>{
    const id = req.params.id
    if(id){
        const user = await User.findById(id)
        if(user){
            user.isBlocked = true
            await user.save()
            res.json({message: 'User blocked'})
            next()

        }
    }
    else{
        throw new Error("Id not found")
    
    }


})

const unblockUser = expressAsyncHandler(async(req, res, next)=>{
    const id = req.params.id
    if(id){
        const user = await User.findById(id)
        if(user){
            user.isBlocked = false
            await user.save()
            res.json({message: 'User unblocked'})
            next()

        }
    }
    else{

        throw new Error("Id not found")
    
    }


})

module.exports = {
    authMiddleware, 
    isAdmin, 
    blockUser, 
    unblockUser
}