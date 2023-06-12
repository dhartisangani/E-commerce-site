const Order = require('../modals/Order')

exports.getOrder = async (req, res, next) => {
    const orderList = await Order.find().populate('user', 'name').sort({ 'dateOrdered': -1 });

    if (!orderList) {
        res.status(500).json({ success: false })
    }
    res.send(orderList);
};

exports.getTotalNumberofOrder = async (req, res, next) => {
    try {
        const count = await Order.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: "Failed to count users" });
    }
};
exports.getPerDaySalse = async (req, res, next) => {
    try {
        const orderList = await Order.find().sort({ 'dateOrdered': -1 });

        if (!orderList) {
            return res.status(500).json({ success: false });
        }

        const salesPerDay = orderList.reduce((acc, order) => {
            const dateOrdered = order.dateOrdered.toDateString();
            const totalAmount = order.totalAmount;

            if (acc[dateOrdered]) {
                acc[dateOrdered].sales += totalAmount;
                acc[dateOrdered].orders++;
            } else {
                acc[dateOrdered] = {
                    date: dateOrdered,
                    sales: totalAmount,
                    orders: 1
                };
            }

            return acc;
        }, {});

        const formattedSalesAndOrdersPerDay = Object.values(salesPerDay);

        formattedSalesAndOrdersPerDay.sort((a, b) => new Date(a.date) - new Date(b.date));

        res.send(formattedSalesAndOrdersPerDay);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error.');
    }
};


exports.createOrder = async (req, res, next) => {
    try {

        const { selectedAddress, cartItems, totalAmount } = req.body;

        if (!selectedAddress) {
            return res.status(400).send('Selected address is required.');
        }
        if (!totalAmount) {
            return res.status(400).send('total amount is required.');
        }

        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ error: 'Invalid cart items.' });
        }
        // const validatedCartItems = cartItems.map((item) => ({
        //     product: {
        //         _id: item.product._id,
        //         image: item.product.image,
        //         price: item.product.price,
        //         productName: item.product.productName,
        //         quantity: item.quantity, // Add the 'quantity' field
        //         totalPrice: item.product.totalPrice,
        //     },
        // }));
        const order = await Order.create({
            cartItems: cartItems,
            totalAmount: totalAmount,
            address1: selectedAddress.address1,
            address2: selectedAddress.address2,
            city: selectedAddress.city,
            pincode: selectedAddress.pincode,
            state: selectedAddress.state,
            email: selectedAddress.email,
            firstName: selectedAddress.firstName,
            lastName: selectedAddress.lastName,
            cardNumber: selectedAddress.cardNumber,
            expiryDate: selectedAddress.expiryDate,
            cvv: selectedAddress.cvv,
            cardHolderName: selectedAddress.cardHolderName,
            paymentMethod: selectedAddress.paymentMethod,
            user: req.body.user,
        });

        const savedOrder = await order.save();

        if (!savedOrder) {
            return res.status(400).send('The order could not be created.');
        }

        res.send(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error.');
    }
};
