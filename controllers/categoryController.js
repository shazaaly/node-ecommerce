const Category = require('../models/categoryModel');
const expressAsyncHandler = require('express-async-handler');
const validateId = require('../utils/validateObjectId');


const createCategory = expressAsyncHandler(async (req, res) => {
    try {
        const cat = await Category.findOne({ title: req.body.title });
        if (cat) {
            return res.status(400).json({ message: "Category already exists" })
        }
        const newCat = new Category(req.body);
        const savedCat = await newCat.save();
        if (!savedCat) {
            return res.status(500).json({ message: "Category could not be saved" })
        }
        return res.status(200).json({ message: "Category saved successfully", category: savedCat });
    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }
})

const getAllCategories = expressAsyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({
            data: { categories }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

const getCategoryById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "category not found" })
        }
        res.json(category)

    } catch (error) {
        throw new Error(error.message)

    }


})
const updateCategory= expressAsyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
        }
        const { id } = req.params;

        const validId = validateId(id);
        if (validId) {

            const product = await Category.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(product)
        } else {
            res.status(404).json({ message: "category not found" })
        }

    } catch (error) {
        throw new Error(error.message)

    }

})
const deletecategory = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const validId = validateId(id);
        if (validId) {
            const cat = await Category.findByIdAndDelete(id);
            if (!cat) {
                return res.status(404).json({ message: "category not found" })
            }
            await Product.updateMany({category : id}, {category : null})
            await cat.remove()

            res.status(200).json({ message: "Category deleted" })
        } else {
            res.status(404).json({ message: "Category not found" })
        }

    } catch (error) {
        throw new Error(error.message)

    }

})

const getCategoryProducts = expressAsyncHandler(async (req, res) => {
    try {
        const {cat_id} = req.params;

        const cat = await Category.findById({_id:cat_id}).populate('products');
        if(!cat) return res.status(404).json({message: 'Category not found'});
        return res.status(200).json(cat.products);
    
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

})


module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deletecategory,
    getCategoryProducts
};