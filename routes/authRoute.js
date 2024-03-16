const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUserController,
    allUsers, 
    getUserById,
    deleteUser, 
    updateUser,
    handleRefreshToken,
    logout,
    updatePassword
} = require('../controllers/userController');


const {authMiddleware, isAdmin, blockUser,unblockUser} = require('../middlewares/authorizationMiddleware');

// Public routes
router.post('/register', createUser);
router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUserController); // No authMiddleware here
router.post('/logout', logout);
router.get('/refresh', handleRefreshToken); // This should probably be a protected route

// Protected routes
router.get('/all', authMiddleware, allUsers);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
router.put('/:id', authMiddleware, isAdmin, updateUser);
router.get('/:id', authMiddleware, isAdmin, getUserById);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router