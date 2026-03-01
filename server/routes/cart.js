const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/add', protect, async (req, res) => {
    const { productId, quantity, size } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user._id });
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(p => p.product.toString() === productId && p.size === size);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                name: product.name,
                image: product.image,
                size,
                quantity,
                price: product.price
            });
        }

        // Update total amount
        cart.totalAmount = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        await cart.save();

        // Send populated cart
        cart = await Cart.findById(cart._id).populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/remove/:productId', protect, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Removing by item _id from cart array
        cart.items = cart.items.filter(item => item._id.toString() !== req.params.productId);

        cart.totalAmount = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        await cart.save();

        cart = await Cart.findById(cart._id).populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/clear', protect, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            cart.totalAmount = 0;
            await cart.save();
        }
        res.json(cart || { items: [], totalAmount: 0 });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;