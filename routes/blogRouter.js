const express = require('express');
const router = express.Router();

const {
    createBlog, 
    updateBlog
} = require('../controllers/blogController');

const {authMiddleware, isAdmin} = require('../middlewares/authorizationMiddleware');

router.post('/', authMiddleware, createBlog);
router.get('/:id', authMiddleware, getBlog);
router.put('/:id', authMiddleware, updateBlog);

module.exports = router;