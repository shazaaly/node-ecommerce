const express = require('express');
const router = express.Router();
const createUser = require('../controllers/userController');
const User = require('../models/userModel');

router.post('/register', createUser)
module.exports = router