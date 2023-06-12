const { getOrder, createOrder, getTotalNumberofOrder, getPerDaySalse } = require('../Controller/orderController');
const Order = require('../modals/Order')
const express = require('express');
// const { OrderItem } = require('../modals/order-item');
const router = express.Router();

// create order 
router.post('/order', createOrder);

// get order 
router.get(`/getorder`, getOrder)

// get total number of orders
router.get("/getorder/count", getTotalNumberofOrder);

// get per day salse 
router.get(`/perdaysalse`, getPerDaySalse);



router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'
            }
        });

    if (!order) {
        res.status(500).json({ success: false })
    }
    res.send(order);
})


router.put('/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true }
    )

    if (!order)
        return res.status(400).send('the order cannot be update!')

    res.send(order);
})
module.exports = router;
