const express = require('express');
const fetchuser = require('../middleWare/fetchuser');
const router = express.Router();
const Product = require('../modals/Product');
const multer = require('multer');
const { addProduct, getProductList, getProductWithSerchandPagination, getProductByID, updateProductwithID, deleteProduct } = require('../Controller/productController');

// For image Uplod
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});

const uploadOptions = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }
});

// Add Product
router.post('/addproduct', uploadOptions.single('image'), addProduct);

// Get ProductList
router.get('/getproductList', getProductList)

// Get Product data with Product ID 
router.get('/getproductList/:id', getProductByID);

// Get Product with Search and Pagination 
router.get('/getproduct', getProductWithSerchandPagination);

// Update Product with ID 
router.put('/updateproduct/:id', fetchuser, updateProductwithID)

// Delete Product 
router.delete('/deleteproduct/:id', fetchuser, deleteProduct)

module.exports = router
