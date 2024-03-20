const express = require('express');
const router = express.Router();

const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deletecategory,
    getCategoryProducts
} = require('../controllers/categoryController');

const {authMiddleware, isAdmin} = require('../middlewares/authorizationMiddleware');

router.post('/create', authMiddleware, createCategory);
router.get('/all', authMiddleware, getAllCategories);
router.get('/products/:id', authMiddleware, getCategoryProducts);
router.get('/:id', authMiddleware, getCategoryById);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deletecategory);

module.exports = router;