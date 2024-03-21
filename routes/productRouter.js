const express = require('express');
const router = express.Router();
const {isAdmin, authMiddleware} = require('../middlewares/authorizationMiddleware')
const swaggerJsdoc = require('swagger-jsdoc');


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce API',
            version: '1.0.0',
            description: 'API documentation for the Ecommerce application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/productRouter.js'],
};

const specs = swaggerJsdoc(options);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(specs));
const {
    createProduct, 
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToWishList,
    removeFromWishList
} = require('../controllers/productController');


router.post('/create', authMiddleware, createProduct);
// router.post('/create', authMiddleware, isAdmin, createProduct);
router.get('/all', authMiddleware, getAllProducts);

router.get('/:id', authMiddleware, getProductById);
router.post('/:id/addToWishList', authMiddleware, addToWishList);
router.post('/:id/removeFromWishList', authMiddleware, removeFromWishList);


router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

module.exports = router