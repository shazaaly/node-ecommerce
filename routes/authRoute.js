const express = require('express');
const router = express.Router();

const {
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
    resetPassword
} = require('../controllers/userController');


const { authMiddleware, isAdmin, blockUser, unblockUser } = require('../middlewares/authorizationMiddleware');

// Public routes
router.post('/register', createUser);
router.post('/forget-password', forgetPasswordToken);
router.get('/reset-password/:token', resetPassword);

router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUser); // No authMiddleware here
router.post('/logout', logout);
router.get('/refresh', handleRefreshToken); // This should probably be a protected route

// Protected routes
router.get('/all', authMiddleware, allUsers);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
router.put('/:id', authMiddleware, updateUser);
router.get('/:id', authMiddleware, getUserById);
router.delete('/:id', authMiddleware, deleteUser);




module.exports = router