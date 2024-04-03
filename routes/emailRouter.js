const express = require('express');
const router = express.Router();

const sendMail = require('../controllers/emailController');

router.post('/send', sendMail);

module.exports = router;
