const express = require('express');
const router = express.Router();
const {isAdmin, authMiddleware} = require('../middlewares/authorizationMiddleware')

const {
    createProduct, 
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.post('/create', createProduct);
// router.post('/create', authMiddleware, isAdmin, createProduct);
router.get('/all', getAllProducts);

router.get('/:id', getProductById);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

module.exports = router