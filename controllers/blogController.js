const Blog = require('../models/blogModel');
const expressAsyncHandler = require('express-async-handler');

const createBlog = expressAsyncHandler(async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({
            data: { blog }

        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

const updateBlog = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.json({
            data: { updatedBlog }
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

const getBlog = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findOneAndUpdate(
            { _id: id },
            { $inc: { numViews: 1 } },
            { new: true }
        );
        if (!blog) {
            res.status(404).json({
                message: 'Blog not found'
            });
        }
        res.json({
            status: 'success',
            data: { blog }
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

const getAllBlogs = expressAsyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({
            status: 'success',
            data: { blogs }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

const deleteBlog = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findOne({ _id: id });
        if (!blog) {
            res.status(404).json({
                message: 'Blog not found'
            });
        }
        await blog.deleteOne({ _id: id });
        res.json({
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });

    }
})
const likeBlog = expressAsyncHandler(async (req, res) => {
    try {
        const { blogId } = req.params;
        let userId = req.user._id;
        userId = userId.toString();
        // get the blog
        const blog = await Blog.findOneAndUpdate(
            { _id: blogId },
            { $addToSet: { likes: userId } },
            { new: true }

        )
        if (!blog) {
            res.status(404).json({
                message: 'Blog not found'
            });
        }

        return res.status(200).json({
            data: { blog }
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
})

const removeLike = expressAsyncHandler(async (req, res) => {
    try {
        const { blogId } = req.params;
        let userId = req.user._id;
        userId = userId.toString();
        // get the blog
        //check if already liked by user : 
        const isLiked = await Blog.findOne({
            _id : blogId,
            likes: userId

        })
        if(isLiked){
            const blog = await Blog.findOneAndUpdate(
                { _id: blogId },
                { $pull: { likes: userId } },
                { new: true }
    
            )
            if (!blog) {
                res.status(404).json({
                    message: 'Blog not found'
                });
            }
    
            return res.status(200).json({
                data: { blog }
            });
;
        }else{
            res.status(400).json({
                message: 'Blog not liked by user!'
            });
        }


    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
})

module.exports = {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    removeLike
};