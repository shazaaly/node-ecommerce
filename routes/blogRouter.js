const express = require('express');
const router = express.Router();

const {
    createBlog, 
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog
} = require('../controllers/blogController');

const {authMiddleware, isAdmin} = require('../middlewares/authorizationMiddleware');

router.post('/', authMiddleware, createBlog);
router.get('/all', authMiddleware, getAllBlogs);
router.get('/:id', authMiddleware, getBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;