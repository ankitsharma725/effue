const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const fs = require('fs');
const path = require('path');
const { protect } = require('../middleware/auth');

// Mock Data Fallback
const mockDataPath = path.join(__dirname, '../data/orders.json');

// Helper to get or create mock file
const getMockData = () => {
    if (!fs.existsSync(mockDataPath)) {
        fs.writeFileSync(mockDataPath, JSON.stringify([], null, 4));
    }
    return JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));
};

// Create new order (allowing guests)
router.post('/', async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    try {
        let createdOrder;
        let savedToDB = false;

        if (require('mongoose').connection.readyState === 1) {
            try {
                const order = new Order({
                    orderItems,
                    user: req.user ? req.user._id : undefined,
                    shippingAddress,
                    paymentMethod,
                    totalPrice
                });
                createdOrder = await order.save();
                savedToDB = true;
            } catch (err) {
                console.warn('MongoDB Create Order failed, falling back to JSON:', err.message);
            }
        }

        if (!savedToDB) {
            const data = getMockData();
            createdOrder = {
                _id: Date.now().toString(),
                orderItems,
                user: req.user ? req.user._id : 'guest',
                shippingAddress,
                paymentMethod,
                totalPrice,
                isPaid: false,
                isDelivered: false,
                createdAt: new Date().toISOString()
            };
            data.push(createdOrder);
            fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 4));
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
});

// Admin Get all orders
router.get('/', async (req, res) => {
    try {
        if (require('mongoose').connection.readyState === 1) {
            try {
                const orders = await Order.find({}).populate('user', 'name email');
                return res.json(orders);
            } catch (err) { }
        }
        res.json(getMockData());
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get user orders
router.get('/my-orders', protect, async (req, res) => {
    try {
        if (require('mongoose').connection.readyState === 1) {
            try {
                const orders = await Order.find({ user: req.user._id });
                return res.json(orders);
            } catch (err) { }
        }
        const data = getMockData();
        const userOrders = data.filter(o => o.user === req.user._id.toString());
        res.json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;