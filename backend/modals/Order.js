
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
 
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  });
const orderSchema = mongoose.Schema({
    // cartItems: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'OrderItem',
    //     required: true
    // }],
 
    cartItems: {
        type: [productSchema],
        required: true,
      },
      totalAmount:{
        type: Number,
        required: true,
      },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String, 
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: Number,
    },
    lastName: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
    },
    cvv: {
        type: Number,
    },
    cardHolderName: {
        type: String,
    },
    paymentMethod: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('order', orderSchema)


// {
//     "orderItems": [
//      {
//               "quantity": 3,
//               "product" : "646b102600cb652e11a30491"
//           },
//           {
//               "quantity": 2,
//               "product" : "646b102600cb652e11a30491"
//           }
      
//     ],
//     "address1": "sdsdsdsssds",
//     "address2": "fsdfsfsdfsdfsdf",
//     "city": "fsfdfs",
//     "pincode": "123456",
//     "state": "ddadad",
//     "email": "1234567890",
//     "firstName": "dadfafs",
//     "lastName": "dadfafs"
//   }