const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    id: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avgRating: {
        type: Number,
        // required: true
    },
    reviews: [{
        rating: {
            type: Number,
            // required: true
        },
        text: {
            type: String,
            // required: true
        },
    },]
})

ProductSchema.index({ productName: 'text', category: 'text' });


module.exports = mongoose.model('product', ProductSchema)
