const express = require('express');
const router = express.Router();

const sendMail = require('../controllers/emailController');

/**
 * @swagger
 * /send:
 *   post:
 *     summary: Send email.
 *     description: Sends an email.
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/send', sendMail);

/**
 * @swagger
 * /send:
 *   post:
 *     summary: Send email.
 *     description: Sends an email.
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/send', sendMail);

module.exports = router;
