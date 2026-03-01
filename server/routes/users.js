const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { protect } = require('../middleware/auth');

const mockDataPath = path.join(__dirname, '../data/users.json');

const getMockData = () => {
    if (!fs.existsSync(mockDataPath)) {
        fs.writeFileSync(mockDataPath, JSON.stringify([], null, 4));
    }
    return JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'effue_secret_key_2024_super_secure', {
        expiresIn: '30d',
    });
};

router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        if (require('mongoose').connection.readyState === 1) {
            try {
                const userExists = await User.findOne({ email });
                if (userExists) {
                    return res.status(400).json({ message: 'User already exists' });
                }

                const user = await User.create({ name, email, password, phone });
                if (user) {
                    return res.status(201).json({
                        user: { _id: user._id, name: user.name, email: user.email, phone: user.phone },
                        token: generateToken(user._id),
                    });
                }
            } catch (err) { }
        }

        // Mock Fallback
        const data = getMockData();
        if (data.find(u => u.email === email)) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = { _id: Date.now().toString(), name, email, password, phone };
        data.push(newUser);
        fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 4));

        return res.status(201).json({
            user: { _id: newUser._id, name, email, phone },
            token: generateToken(newUser._id)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (require('mongoose').connection.readyState === 1) {
            try {
                const user = await User.findOne({ email });
                if (user && (await user.matchPassword(password))) {
                    return res.json({
                        user: { _id: user._id, name: user.name, email: user.email, phone: user.phone },
                        token: generateToken(user._id),
                    });
                } else if (user) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }
            } catch (e) { }
        }

        // Mock Fallback
        const data = getMockData();
        const user = data.find(u => u.email === email);
        if (user && user.password === password) {
            return res.json({
                user: { _id: user._id, name: user.name, email: user.email, phone: user.phone },
                token: generateToken(user._id)
            });
        }
        res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

router.get('/profile', protect, async (req, res) => {
    try {
        if (require('mongoose').connection.readyState === 1) {
            try {
                const user = await User.findById(req.user._id).select('-password');
                if (user) return res.json(user);
            } catch (e) { }
        }
        res.status(404).json({ message: 'User not found' });
    } catch (e) {
        res.status(500).json({ message: 'Server Issue' });
    }
});

router.get('/', async (req, res) => {
    try {
        if (require('mongoose').connection.readyState === 1) {
            try {
                const users = await User.find({}).select('-password');
                return res.json(users);
            } catch (e) { }
        }

        const data = getMockData().map(u => ({ ...u, password: undefined }));
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: 'Server Issue' });
    }
});

module.exports = router;