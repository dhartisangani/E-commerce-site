const Product = require('../modals/Product');
const { body, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

exports.addProduct = async (req, res) => {
    try {

        const { id, productName, category, price, imgUrl, status, quantity, shortDesc, subcategory, description, rating, reviews, text, avgRating } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const product = await Product.create({
            id,
            productName,
            imgUrl,
            category,
            subcategory,
            price,
            status,
            quantity,
            shortDesc,
            description,
            reviews,
            rating,
            text,
            avgRating,
        });

        const saveProduct = await product.save();
        res.json(saveProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error...");
    }
};

exports.getProductList = async (req, res) => {
    try {
        const id = req.body
        const product = await Product.find(id)
        res.send(product)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
};

exports.getProductByID = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ _id: new ObjectId(productId) });
        // const product = await Product.findOne({ id: productID }); 
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.send(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error...");
    }
};

exports.updateProductwithID = async (req, res) => {
    const { id,
        productName,
        imgUrl,
        category,
        quantity,
        subcategory,
        price,
        status,
        shortDesc,
        description,
    } = req.body
    let product = await Product.findById(req.params.id)
    try {
        const updateProduct = {}
        if (id) { updateProduct.id = id }
        if (productName) { updateProduct.productName = productName }
        if (imgUrl) { updateProduct.imgUrl = imgUrl }
        if (category) { updateProduct.category = category }
        if (subcategory) { updateProduct.subcategory = subcategory }
        if (price) { updateProduct.price = price }
        if (status) { updateProduct.status = status }
        if (quantity) { updateProduct.quantity = quantity }
        if (description) { updateProduct.description = description }
        if (shortDesc) { updateProduct.shortDesc = shortDesc }

        if (!product) {
            return res.status(404).send('Not found')
        }
        // if (product.user.toString() !== req.user._id) {
        //     return res.status(401).send('Not allowed')
        // }
        product = await Product.findByIdAndUpdate(req.params.id, { $set: updateProduct }, { new: true })
        res.json({ product })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
};

exports.deleteProduct = async (req, res) => {
    let product = await Product.findById(req.params.id)
    try {

        if (!product) {
            return res.status(404).send('Not found')
        }
        // if (product.user.toString() !== req.user.id) {  
        //     return res.status(401).send('Not allowed')
        // }
        product = await Product.findByIdAndDelete(req.params.id)
        res.json({ "success": "Deleted successfully", product: product })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
};

exports.getProductWithSerchandPagination = async (req, res) => {
    try {
        const searchValue = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let query = {};
        if (searchValue) {
            query = { $text: { $search: searchValue } };
        }

        const productsCount = await Product.countDocuments(query);
        const totalPages = Math.ceil(productsCount / limit);

        const products = await Product.find(query)
            .skip(startIndex)
            .limit(limit);

        const response = {
            total_pages: totalPages,
            current_page: page,
            total_products: productsCount,
            products: products,
        };
        res.send(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error...");
    }
};
