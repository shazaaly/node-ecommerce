const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUserController,
    allUsers, 
    getUserById,
    deleteUser, 
    updateUser,
} = require('../controllers/userController');


const {authMiddleware, isAdmin, blockUser,unblockUser} = require('../middlewares/authorizationMiddleware');

router.post('/register', createUser)
router.post('/login', loginUserController)
router.get('/all', allUsers)
router.put('/:id', authMiddleware, isAdmin,updateUser)
router.get('/:id',authMiddleware, isAdmin, getUserById)
router.put('/block-user/:id', authMiddleware, blockUser)
router.put('/unblock-user/:id', authMiddleware, unblockUser)
router.delete('/:id', deleteUser)

module.exports = router