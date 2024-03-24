const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middlewares/authorizationMiddleware');
const { uploadPhoto, resizeAndUploadImage } = require('../middlewares/imageUploadMiddleware')
const {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToWishList,
    removeFromWishList,
    addRating,
    getAverageRating,
    uploadImagesCtrl
} = require('../controllers/productController');
/**
 * @swagger
 * /api/product/{id}/addrating:
 *   post:
 *     summary: Add Rating to Product
 *     description: Add a rating to a product by its ID.
 *     tags:
 *       - Products
 * 
 *     security:
 *     - BearerAuth: []
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to add rating to.
 *         schema:
 *           type: string
 *         
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stars:
 *                 type: number
 *                 description: The rating to be added (out of 5 stars).
 *               comment:
 *                 type: string
 *                 description: The comment to be added.
 *     responses:
 *       200:
 *         description: Rating added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Product not found or rating already exists.
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *       500:
 *         description: Internal server error.
 * 
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: Enter your bearer token in the format `Bearer {token}`
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the product.
 *         title:
 *           type: string
 *           description: The title of the product.
 *         price:
 *           type: number
 *           description: The price of the product.
 *         description:
 *           type: string
 *           description: The description of the product.
 *         quantity:
 *           type: number
 *           description: The quantity of the product.
 *         slug:
 *           type: string
 *           description: The slug of the product.
 *         sold:
 *           type: number
 *           description: The quantity of the product sold.
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs associated with the product.
 *         ratings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               stars:
 *                 type: number
 *                 description: The rating given by the user (out of 5 stars).
 *               postedBy:
 *                 type: string
 *                 description: The user ID who posted the rating.
 *           description: Array of ratings given to the product by users.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was last updated.
 *         __v:
 *           type: number
 *           description: Version number of the product schema.
 */


router.post('/create', authMiddleware, createProduct);
router.get('/all', authMiddleware, getAllProducts);
router.get('/:id', authMiddleware, getProductById);
router.get('/:id/get-avg-rating', authMiddleware, getAverageRating);
router.post('/:id/addToWishList', authMiddleware, addToWishList);
router.post('/:id/removeFromWishList', authMiddleware, removeFromWishList)
router.post('/:id/addrating', authMiddleware, addRating)
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
// POST route to handle multiple file uploads and resizing


router.post('/:id/upload', uploadPhoto.array('images', 5), resizeAndUploadImage, uploadImagesCtrl);
  
  
module.exports = router;
