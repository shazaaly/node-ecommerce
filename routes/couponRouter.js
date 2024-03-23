const express = require('express');
const {
    createCoupon, 
    updateCoupon,
    deleteCoupon
} = require('../controllers/couponController');

const {authMiddleware, isAdmin} = require('../middlewares/authorizationMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/coupon/create:
 *   post:
 *     summary: Create Coupon
 *     description: Create a new coupon with the provided details.
 *     tags:
 *       - Coupons
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The coupon code.
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *                 description: The expiry date of the coupon in "DD-MM-YYYY HH" format.
 *               discountPercentage:
 *                 type: number
 *                 format: float
 *                 description: The discount percentage of the coupon.
 *     responses:
 *       201:
 *         description: Coupon created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Bad request. Invalid coupon details provided.
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.post('/create', authMiddleware, isAdmin, createCoupon);
router.put('/update', authMiddleware, isAdmin, updateCoupon);
router.delete('/:id/delete', authMiddleware, isAdmin, deleteCoupon);

module.exports = router;