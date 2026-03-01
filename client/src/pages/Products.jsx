import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown, Loader } from 'lucide-react';

const categories = ['All', 'Oriental', 'Floral', 'Oud', 'Fresh'];
const genders = ['All', 'Men', 'Women', 'Unisex'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');
    const [sortBy, setSortBy] = useState('Featured');
    const [showFilters, setShowFilters] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = searchQuery
                    ? `http://localhost:5000/api/products?search=${searchQuery}`
                    : 'http://localhost:5000/api/products';
                const { data } = await axios.get(url);
                setAllProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
                setAllProducts([]); // fallback
            }
            setLoading(false);
        };
        fetchProducts();
    }, [searchQuery]);

    const filteredProducts = allProducts.filter(product => {
        const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
        const genderMatch = selectedGender === 'All' || product.gender === selectedGender;
        return categoryMatch && genderMatch;
    }).sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        // Default featured/newest retains DB order
        return 0;
    });

    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                        {searchQuery ? 'Search Results' : 'The '}
                        <span className="text-gold-gradient">{searchQuery ? `for "${searchQuery}"` : 'Collection'}</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover our curated selection of luxury fragrances, each crafted to perfection.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 text-gray-300 hover:text-effue-gold transition-colors md:hidden"
                        >
                            <Filter size={20} />
                            Filters
                        </button>

                        <div className={`${showFilters ? 'block' : 'hidden'} md:flex flex-wrap gap-4`}>
                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === cat
                                            ? 'bg-effue-gold text-effue-black'
                                            : 'bg-effue-dark text-gray-300 hover:bg-effue-gold/20'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Gender Filter */}
                            <div className="flex flex-wrap gap-2">
                                {genders.map(gender => (
                                    <button
                                        key={gender}
                                        onClick={() => setSelectedGender(gender)}
                                        className={`px-4 py-2 rounded-full text-sm transition-all ${selectedGender === gender
                                            ? 'bg-effue-gold text-effue-black'
                                            : 'bg-effue-dark text-gray-300 hover:bg-effue-gold/20'
                                            }`}
                                    >
                                        {gender}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-effue-dark border border-white/10 rounded-lg px-4 py-2 pr-10 text-gray-300 focus:outline-none focus:border-effue-gold"
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm">
                        Showing {filteredProducts.length} products
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-24">
                        <Loader size={48} className="text-effue-gold animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Product Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={product._id || product.id} product={product} index={index} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-gray-400 text-lg">No products found matching your filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSelectedGender('All');
                                        if (searchQuery) window.location.href = '/products';
                                    }}
                                    className="mt-4 text-effue-gold hover:underline border border-effue-gold px-4 py-2 rounded"
                                >
                                    Clear all filters & search
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
