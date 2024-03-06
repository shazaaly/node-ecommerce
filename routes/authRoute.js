const express = require('express');
const router = express.Router();
const {createUser, loginUserController, allUsers, getUserById, deleteUser, updateUser} = require('../controllers/userController');

router.post('/register', createUser)
router.post('/login', loginUserController)
router.get('/all', allUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

module.exports = router