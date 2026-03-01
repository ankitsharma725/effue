import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
                    Your <span className="text-gold-gradient">Wishlist</span>
                </h1>

                {wishlist.length === 0 ? (
                    <div className="glass p-8 rounded-lg text-center py-20">
                        <Heart size={48} className="mx-auto text-effue-gold/50 mb-4" />
                        <p className="text-gray-400 text-lg mb-6">Your wishlist is currently empty.</p>
                        <Link to="/products">
                            <button className="btn-luxury">Discover Products</button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlist.map((item, index) => (
                            <motion.div
                                key={item._id || item.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="product-card group relative"
                            >
                                <div className="relative bg-effue-dark rounded-lg overflow-hidden border border-white/5 hover:border-effue-gold/30 transition-all duration-500">
                                    <button
                                        onClick={() => removeFromWishlist(item._id || item.id)}
                                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-red-500 hover:bg-black transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <Link to={`/product/${item._id || item.id}`}>
                                        <div className="relative h-64 overflow-hidden bg-gradient-to-b from-effue-dark to-black">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-6 transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                    </Link>

                                    <div className="p-6">
                                        <Link to={`/product/${item._id || item.id}`}>
                                            <h3 className="text-lg font-display font-semibold text-white group-hover:text-effue-gold transition-colors mb-2">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-xl font-bold text-effue-gold">₹{item.price}</span>
                                            <Link to={`/product/${item._id || item.id}`}>
                                                <button className="p-3 bg-effue-gold text-effue-black rounded-full hover:bg-effue-gold-light transition-colors">
                                                    <ShoppingBag size={18} />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
