const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    category: { type: String, required: true },
    gender: { type: String, required: true },
    tag: { type: String },
    sizes: [{ type: String }],
    notes: {
        top: [{ type: String }],
        middle: [{ type: String }],
        base: [{ type: String }]
    },
    inStock: { type: Boolean, default: true }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
