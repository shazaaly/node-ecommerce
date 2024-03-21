const express = require('express');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: API endpoints for managing blogs
 * 
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '201':
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /blogs/like/{blogId}:
 *   post:
 *     summary: Like a blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to like
 *     responses:
 *       '200':
 *         description: Blog liked successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Blog not found
 * 
 * /blogs/unlike/{blogId}:
 *   put:
 *     summary: Remove like from a blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to remove like from
 *     responses:
 *       '200':
 *         description: Like removed successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Blog not found
 * 
 * /blogs/all:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Blogs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       '401':
 *         description: Unauthorized
 * 
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to retrieve
 *     responses:
 *       '200':
 *         description: Blog retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Blog not found
 * 
 *   put:
 *     summary: Update a blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '200':
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Blog not found
 * 
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to delete
 *     responses:
 *       '200':
 *         description: Blog deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Blog not found
 */

const {
    createBlog, 
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    removeLike
} = require('../controllers/blogController');

const {authMiddleware, isAdmin} = require('../middlewares/authorizationMiddleware');

router.post('/', authMiddleware, createBlog);
router.post('/like/:blogId', authMiddleware, likeBlog);
router.put('/unlike/:blogId', authMiddleware, removeLike);
router.get('/all', authMiddleware, getAllBlogs);
router.get('/:id', authMiddleware, getBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;