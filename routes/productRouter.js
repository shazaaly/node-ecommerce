const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middlewares/authorizationMiddleware');

const {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToWishList,
    removeFromWishList,
    addRating
} = require('../controllers/productController');


router.post('/create', authMiddleware, createProduct);
router.get('/all', authMiddleware, getAllProducts);
router.get('/:id', authMiddleware, getProductById);
router.post('/:id/addToWishList', authMiddleware, addToWishList);
router.post('/:id/removeFromWishList', authMiddleware, removeFromWishList)
router.post('/:id/addrating', authMiddleware, addRating)
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

module.exports = router;
