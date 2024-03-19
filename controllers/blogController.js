const Blog = require('../models/blogModel');
const expressAsyncHandler = require('express-async-handler');

const createBlog = expressAsyncHandler(async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({
            status: 'success',
            data:{blog}

        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

const updateBlog = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBlog = await Blog.findOneAndUpdate({_id: id}, req.body, {new: true});
        res.json({
            status: 'success',
            data: {updatedBlog}
        });
       
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

const getBlog = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findOne({_id: id});
        res.json({
            status: 'success',
            data: {blog}
        });
       
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = {createBlog, updateBlog, getBlog};