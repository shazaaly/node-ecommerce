const Product = require('../models/productModel');
const expressAsyncHandler = require('express-async-handler');
const validateId = require('../utils/validateObjectId');
const slugify = require('slugify');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const resizeAndUploadImage = require('../middlewares/imageUploadMiddleware');
const elasticsearchClient = require('../utils/elasticSearchClient');


///////////
// Function to index a product document
async function indexProduct(product) {
    try {
      const response = await elasticsearchClient.index({
        index: 'products', // Name of the index
        body: product
      });
      console.log('Indexed product:', response);
    } catch (error) {
      console.error('Error indexing product:', error);
    }
  }



const createProduct = expressAsyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
    } catch (error) {

        throw new Error(error.message)
    }

    const existingProduct = await Product.findOne({ title: req.body.title });
    if (existingProduct) {
        return res.status(400).json({ message: "Product already exists" })
    }
    const product = new Product(req.body)
    const savedProduct = await product.save()
    indexProduct(savedProduct);
    let cat = savedProduct.category
    cat = cat.toString()
    const category = await Category.findById(cat)
    category.products.push(savedProduct._id)
    if (!savedProduct) {
        return res.status(500).json({ message: "Product could not be saved" })
    }
    
    res.status(201).json({
        "product": savedProduct
    })

})

// Helper function for advanced filtering
const buildFilterQuery = (query) => {
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(field => delete query[field]);
    let queryString = JSON.stringify(query).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    return JSON.parse(queryString);
};

// Helper function to build the MongoDB regex query for case-insensitive search
const buildRegexSearch = (query) => {
    if (query.title) {
        return { title: { $regex: query.title, $options: 'i' } };
    }
    return {};
};

// Helper function for sorting
const buildSortQuery = (sort) => {
    return sort ? sort.split(',').join(' ') : '-createdAt';
};

// Helper function for field limiting (projection)
const buildFieldLimitQuery = (fields) => {
    return fields ? fields.split(',').join(' ') : '-__v';
};

// Helper function for pagination
const buildPaginationOptions = (page, limit) => {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    return {
        skip: (pageNum - 1) * limitNum,
        limit: limitNum
    };
};

const getAllProducts = expressAsyncHandler(async (req, res, next) => {
    try {
        // Constructing queries
        const filterQuery = buildFilterQuery({ ...req.query });
        const regexSearch = buildRegexSearch(req.query);
        const sortQuery = buildSortQuery(req.query.sort);
        const fieldsQuery = buildFieldLimitQuery(req.query.fields);
        const { skip, limit } = buildPaginationOptions(req.query.page, req.query.limit);

        // Combined query object
        const queryObject = { ...filterQuery, ...regexSearch };

        // Query execution
        let query = Product.find(queryObject)
            .sort(sortQuery)
            .select(fieldsQuery)
            .skip(skip)
            .limit(limit);

        // Getting total records for pagination calculation
        const totalRecords = await Product.countDocuments(queryObject);

        // Query result
        const products = await query;

        // Checking if the page number exceeds the total pages
        if (req.query.page && skip >= totalRecords) {
            return res.status(404).json({ status: false, message: 'Page does not exist!' });
        }

        // Response
        res.status(200).json({
            status: true,
            data: {
                products,
                totalPages: Math.ceil(totalRecords / limit),
                page: skip / limit + 1,
                limit,
                totalRecords
            }
        });
    } catch (error) {
        next(error);
    }
});



const getProductById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.json(product)

    } catch (error) {
        throw new Error(error.message)

    }


})
const updateProduct = expressAsyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const { id } = req.params;

        const validId = validateId(id);
        if (validId) {

            const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(product)
        } else {
            res.status(404).json({ message: "Product not found" })
        }

    } catch (error) {
        throw new Error(error.message)

    }

})
const deleteProduct = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const validId = validateId(id);
        if (validId) {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" })
            }
            res.status(200).json({ message: "Product deleted" })
        } else {
            res.status(404).json({ message: "Product not found" })
        }

    } catch (error) {
        throw new Error(error.message)

    }

})

const addToWishList = expressAsyncHandler(async (req, res) => {
    const prod_id = req.params.id
    if (!prod_id) {
        return res.status(400).json({ message: "Product Not Found!" })
    }
    const user_id = req.user._id;
    if (!user_id) {
        return res.status(400).json({ message: "User id is required" })
    }
    validateId(prod_id)
    validateId(user_id)
    const IsExistingInWishList = await User.findOne({ _id: user_id, wishlist: prod_id })
    if (IsExistingInWishList) {
        return res.status(400).json({ message: "Product already in wishlist" })
    }
    const updatedUser = await User.findByIdAndUpdate(
        user_id,
        { $addToSet: { wishlist: prod_id } },
        { new: true }
    )
    return res.status(200).json({ message: "Product added to wishlist", updatedUser })


})

const removeFromWishList = expressAsyncHandler(async (req, res) => {
    const prod_id = req.params.id
    const user_id = req.user._id;
    if (!user_id) {
        return res.status(400).json({ message: "User Not Found" })
    }
    validateId(prod_id)
    validateId(user_id)
    const IsExistingInWishList = await User.findOne({ _id: user_id, wishlist: {$in : [prod_id]} })
    if (!IsExistingInWishList) {
        return res.status(400).json({ message: "Product Not in wishlist" })
    }
    const updatedUser = await User.findByIdAndUpdate(
        user_id,
        { $pull: { wishlist: prod_id } },
        { new: true }
    )
    return res.status(200).json({ message: "Product removed from wishlist", updatedUser })


})

const addRating = expressAsyncHandler(async (req, res) => {
    const prod_id = req.params.id;
    const  { _id } = req.user;
    const comment = req.body.comment;
    const product = await Product.findById(prod_id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    const existingRating = product.ratings.find(rating => rating.postedBy && rating.postedBy.toString() === _id.toString());
    if (existingRating) {
        return res.status(400).json({ message: "Rating already exists" });
    }
    product.ratings.push({
        stars: req.body.stars,
        postedBy: _id,
        comment
    });
    const updatedProduct = await product.save();

    res.json(updatedProduct);
});

const getAverageRating = expressAsyncHandler(async (req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    if(!product){
        return res.status(404).json({message: "Product not found"})
    }
    const len = product.ratings.length
    const sumRatings = product.ratings.reduce((acc, item)=>{
        return acc + item.stars

    }, 0)
    if(len === 0){
        return res.status(200).json({averageRating: 0})
    }
    const averageRating = (sumRatings/len)
    return res.status(200).json({averageRating})


})
const uploadImagesCtrl = async(req, res) => {
    const _id = req.params.id;

    const product = await Product.findById(_id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No images uploaded' });
    req.imageUrls.map((url)=>{
        product.images.push(url)
    })
    await product.save()
    res.json({
      message: "Images uploaded successfully",
      urls: req.imageUrls,
    })}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addToWishList,
    removeFromWishList,
    addRating,
    getAverageRating, 
    uploadImagesCtrl
};