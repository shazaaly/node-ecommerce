const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, isAdmin} = require('../middlewares/authorizationMiddleware');


router.get('/wishlist',authMiddleware,  userController.getUserWishList)
router.post('/admin-login', userController.adminLogin)


module.exports = router;