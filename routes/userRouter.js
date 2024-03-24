const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware} = require('../middlewares/authorizationMiddleware');


router.get('/wishlist',authMiddleware,  userController.getUserWishList)
router.post('/admin-login', userController.adminLogin)
router.post('/admin-logout', userController.adminLogOut);



module.exports = router;