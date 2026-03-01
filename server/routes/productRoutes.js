const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// Mock Data Fallback
const mockDataPath = path.join(__dirname, '../data/products.json');

// Get all products
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: 'i' } }
      : {};

    // Try MongoDB
    if (require('mongoose').connection.readyState === 1) {
      try {
        const products = await Product.find({ ...keyword });
        return res.json(products);
      } catch (err) {
        console.warn('MongoDB Find failed, falling back to JSON:', err.message);
      }
    }

    // Fallback to JSON
    const data = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));
    if (req.query.search) {
      const filtered = data.filter(p => p.name.toLowerCase().includes(req.query.search.toLowerCase()));
      return res.json(filtered);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    if (require('mongoose').connection.readyState === 1) {
      try {
        let product;
        if (require('mongoose').Types.ObjectId.isValid(req.params.id)) {
          product = await Product.findById(req.params.id);
        } else if (!isNaN(req.params.id)) {
          product = await Product.findOne({ id: Number(req.params.id) });
        }
        if (product) return res.json(product);
      } catch (err) {
        console.warn('MongoDB FindById failed, falling back to JSON:', err.message);
      }
    }

    const data = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));
    const product = data.find(p => p.id === Number(req.params.id) || p._id === req.params.id || p.id == req.params.id);
    if (product) return res.json(product);

    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin Create Product
router.post('/', async (req, res) => {
  try {
    let createdProduct;
    let savedToDB = false;

    if (require('mongoose').connection.readyState === 1) {
      try {
        const product = new Product(req.body);
        createdProduct = await product.save();
        savedToDB = true;
      } catch (err) {
        console.warn('MongoDB Create failed, falling back to JSON:', err.message);
      }
    }

    if (!savedToDB) {
      const data = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));
      createdProduct = {
        ...req.body,
        id: data.length > 0 ? Math.max(...data.map(d => Number(d.id) || 0)) + 1 : 1,
        _id: Date.now().toString()
      };
      data.push(createdProduct);
      fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 4));
    }

    return res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
});

// Admin Update Product
router.put('/:id', async (req, res) => {
  try {
    let updatedProduct;
    let savedToDB = false;

    if (require('mongoose').connection.readyState === 1) {
      try {
        updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        if (updatedProduct) savedToDB = true;
      } catch (err) {
        console.warn('MongoDB Update failed, falling back to JSON:', err.message);
      }
    }

    if (!savedToDB) {
      const data = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));
      const productIndex = data.findIndex(p => p.id === Number(req.params.id) || p._id === req.params.id || p.id == req.params.id);

      if (productIndex !== -1) {
        updatedProduct = { ...data[productIndex], ...req.body };
        data[productIndex] = updatedProduct;
        fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 4));
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    }

    return res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
});

// Admin Delete Product
router.delete('/:id', async (req, res) => {
  try {
    let deletedFromDB = false;

    if (require('mongoose').connection.readyState === 1) {
      try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) deletedFromDB = true;
      } catch (err) {
        console.warn('MongoDB Delete failed, falling back to JSON:', err.message);
      }
    }

    if (!deletedFromDB) {
      let data = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));
      const initialLength = data.length;
      data = data.filter(p => p.id !== Number(req.params.id) && p._id !== req.params.id && p.id != req.params.id);

      if (data.length < initialLength) {
        fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 4));
      } else if (require('mongoose').connection.readyState !== 1) {
        return res.status(404).json({ message: 'Product not found' });
      }
    }

    return res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
});

module.exports = router;
