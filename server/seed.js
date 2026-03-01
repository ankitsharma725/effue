const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
    {
        name: 'Effue Noir Elixir',
        description: 'A bold and mysterious fragrance crafted for confident men. Notes of oud, amber, and dark vanilla create a long-lasting luxury experience.',
        price: 1999,
        category: 'Oriental',
        gender: 'Men',
        sizes: ['30ml', '50ml', '100ml'],
        image: '/assets/noir.jpg',
        gallery: ['/assets/noir.jpg', '/assets/noir-2.jpg'],
        notes: {
            top: ['Bergamot', 'Black Pepper', 'Cardamom'],
            middle: ['Oud', 'Amber', 'Cinnamon'],
            base: ['Dark Vanilla', 'Sandalwood', 'Musk']
        },
        tag: 'Bestseller',
        inStock: true
    },
    {
        name: 'Effue Rose Élite',
        description: 'A soft yet powerful feminine fragrance with fresh rose petals, jasmine, and white musk. Perfect for evening elegance.',
        price: 1799,
        category: 'Floral',
        gender: 'Women',
        sizes: ['30ml', '50ml', '100ml'],
        image: '/assets/rose.jpg',
        gallery: ['/assets/rose.jpg', '/assets/rose-2.jpg'],
        notes: {
            top: ['Rose Petals', 'Bergamot', 'Pink Pepper'],
            middle: ['Jasmine', 'Peony', 'Lily of the Valley'],
            base: ['White Musk', 'Cedarwood', 'Vanilla']
        },
        tag: 'Popular',
        inStock: true
    },
    {
        name: 'Effue Royal Oud',
        description: 'Premium Arabian oud blended with saffron and sandalwood. A signature scent for special occasions.',
        price: 2499,
        category: 'Oud',
        gender: 'Unisex',
        sizes: ['50ml', '100ml'],
        image: '/assets/royal.jpg',
        gallery: ['/assets/royal.jpg', '/assets/royal-2.jpg'],
        notes: {
            top: ['Saffron', 'Nutmeg', 'Lavender'],
            middle: ['Arabian Oud', 'Patchouli', 'Rose'],
            base: ['Sandalwood', 'Amber', 'Leather']
        },
        tag: 'Premium',
        inStock: true
    },
    {
        name: 'Effue Citrus Luxe',
        description: 'Fresh lemon zest, bergamot, and aquatic notes. Ideal for daily wear and summer freshness.',
        price: 1599,
        category: 'Fresh',
        gender: 'Unisex',
        sizes: ['30ml', '50ml', '100ml'],
        image: '/assets/citrus.jpg',
        gallery: ['/assets/citrus.jpg', '/assets/citrus-2.jpg'],
        notes: {
            top: ['Lemon Zest', 'Bergamot', 'Grapefruit'],
            middle: ['Aquatic Notes', 'Geranium', 'Rosemary'],
            base: ['White Musk', 'Cedar', 'Ambergris']
        },
        tag: 'New',
        inStock: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Delete existing products
        await Product.deleteMany({});
        console.log('🗑️  Old products deleted');

        // Insert new products
        await Product.insertMany(sampleProducts);
        console.log('✅ Sample products added');

        process.exit();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedDB();
