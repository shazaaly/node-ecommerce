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


const {authMiddleware, isAdmin} = require('../middlewares/authorizationMiddleware');

router.post('/register', createUser)
router.post('/login', loginUserController)
router.get('/all', allUsers)
router.put('/:id', authMiddleware, updateUser)
router.get('/:id',authMiddleware, isAdmin, getUserById)
router.delete('/:id', deleteUser)

module.exports = router