const express = require('express');
const fetchuser = require('../middleWare/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Category = require('../modals/Category');
const { ObjectId } = require('mongodb'); 


router.get('/getcategory', async (req, res) => {
    try {
        const id = req.body
        const product = await Category.find(id)
        res.send(product)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
})

router.post('/addcategory', async (req, res) => {
    const { category } = req.body
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newcategory = await Category.create({
            category

        })
        const saveProduct = await newcategory.save()
        res.send(saveProduct)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
})


router.put('/updatecategory/:id', fetchuser, [
], async (req, res) => {
    const {
        category,
    } = req.body
    let newcategory = await Category.findById(req.params.id)
    try {
        const updateProduct = {}

        if (category) { updateProduct.category = category }


        if (!newcategory) {
            return res.status(404).send('Not found')
        }

        product = await Category.findByIdAndUpdate(req.params.id, { $set: updateProduct }, { new: true })
        res.json({ product })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
})

router.delete('/deletecategory/:id', fetchuser, [
], async (req, res) => {
    let newcategory = await Category.findById(req.params.id)
    try {

        if (!newcategory) {
            return res.status(404).send('Not found')
        }
        // if (product.user.toString() !== req.user.id) {  
        //     return res.status(401).send('Not allowed')
        // }
        product = await Category.findByIdAndDelete(req.params.id)
        res.json({ "success": "Deleted successfully", product: product })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
})

module.exports = router