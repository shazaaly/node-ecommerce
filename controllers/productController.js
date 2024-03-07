const Product = require('../models/productModel');
const expressAsyncHandler = require('express-async-handler');


const createProduct = expressAsyncHandler(async (req, res) => {
    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
        return res.status(400).json({message:"Product already exists"})
    }
    const product  = new Product(req.body)
    const savedProduct= await product.save()
    if(!savedProduct) {
        return res.status(500).json({message:"Product could not be saved"})
    }
    res.status(201).json({
        status: 'success',
        "product" : savedProduct
    })

})

module.exports = createProduct;
