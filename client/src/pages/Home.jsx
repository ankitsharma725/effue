import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data.slice(0, 4)); // Show only top 4 featured
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className="bg-effue-black">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)]" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-effue-gold/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-effue-rose/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center md:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-effue-gold/30 bg-effue-gold/5 mb-6"
                        >
                            <Sparkles size={16} className="text-effue-gold" />
                            <span className="text-sm text-effue-gold tracking-wider uppercase">Luxury Redefined</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6">
                            <span className="text-white">Discover</span>
                            <br />
                            <span className="text-gold-gradient">Your Essence</span>
                        </h1>

                        <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
                            Experience the art of fine perfumery. Each fragrance tells a story of
                            elegance, crafted for those who appreciate the extraordinary.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-luxury flex items-center gap-2"
                                >
                                    Explore Collection
                                    <ArrowRight size={18} />
                                </motion.button>
                            </Link>
                            <Link to="/about">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 border border-effue-gold/50 text-effue-gold hover:bg-effue-gold/10 transition-all duration-300"
                                >
                                    Our Story
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative animate-float">
                            <img
                                src="/assets/hero-bottle.png"
                                alt="Effue Premium Perfume"
                                className="w-full max-w-md mx-auto drop-shadow-2xl"
                            />
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-effue-gold/20 blur-3xl -z-10 rounded-full" />
                        </div>

                        {/* Floating Tags */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-10 right-0 glass px-4 py-2 rounded-lg"
                        >
                            <span className="text-effue-gold text-sm font-semibold">Long Lasting</span>
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute bottom-20 left-0 glass px-4 py-2 rounded-lg"
                        >
                            <span className="text-effue-gold text-sm font-semibold">Premium Quality</span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-effue-gold/50 rounded-full flex justify-center">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-3 bg-effue-gold rounded-full mt-2"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Featured Products */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-effue-gold tracking-widest uppercase text-sm">The Collection</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-6">
                            Signature Fragrances
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Each scent is meticulously crafted to evoke emotions and create lasting impressions.
                            Find the fragrance that defines you.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                            <ProductCard key={product._id || product.id} product={product} index={index} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-8 py-3 border border-effue-gold text-effue-gold hover:bg-effue-gold hover:text-effue-black transition-all duration-300"
                            >
                                View All Products
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Brand Story Preview */}
            <section className="py-24 bg-effue-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-effue-gold tracking-widest uppercase text-sm">Our Heritage</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-6">
                                Crafted in Jaipur,<br />
                                <span className="text-gold-gradient">Loved Worldwide</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                Founded by Ankit Sharma in Sanganer, Jaipur, Effue represents the
                                perfect blend of French perfumery artistry and Arabian opulence.
                                Every bottle is a testament to our commitment to excellence.
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                We believe luxury should be accessible. That's why we've created
                                premium fragrances at prices that don't compromise on quality.
                            </p>
                            <Link to="/about">
                                <button className="btn-luxury">Discover Our Story</button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 mt-8">
                                    <div className="glass p-6 rounded-lg text-center">
                                        <span className="text-4xl font-display font-bold text-effue-gold">10K+</span>
                                        <p className="text-gray-400 text-sm mt-2">Happy Customers</p>
                                    </div>
                                    <div className="glass p-6 rounded-lg text-center">
                                        <span className="text-4xl font-display font-bold text-effue-gold">4</span>
                                        <p className="text-gray-400 text-sm mt-2">Signature Scents</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="glass p-6 rounded-lg text-center">
                                        <span className="text-4xl font-display font-bold text-effue-gold">24h</span>
                                        <p className="text-gray-400 text-sm mt-2">Long Lasting</p>
                                    </div>
                                    <div className="glass p-6 rounded-lg text-center">
                                        <span className="text-4xl font-display font-bold text-effue-gold">100%</span>
                                        <p className="text-gray-400 text-sm mt-2">Premium Quality</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
