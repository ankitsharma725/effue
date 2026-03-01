import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, index }) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const navigate = useNavigate();

    const isWished = isInWishlist(product._id || product.id);

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWished) {
            removeFromWishlist(product._id || product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const defaultSize = product.sizes?.[1] || product.sizes?.[0] || '50ml';
        const result = await addToCart(product._id || product.id, 1, defaultSize);

        if (result.success) {
            // Success handled silently or could show a toast
        } else {
            console.error(result.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="product-card group"
        >
            <div className="relative bg-effue-dark rounded-lg overflow-hidden border border-white/5 hover:border-effue-gold/30 transition-all duration-500">
                {/* Tag */}
                {product.tag && (
                    <div className="absolute top-4 left-4 z-10 bg-effue-gold text-effue-black text-xs font-bold px-3 py-1 rounded-full">
                        {product.tag}
                    </div>
                )}

                {/* Wishlist */}
                <button
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black transition-all opacity-0 group-hover:opacity-100"
                >
                    <Heart size={18} className={isWished ? 'fill-effue-rose text-effue-rose' : 'text-gray-400 hover:text-red-500'} />
                </button>

                {/* Image */}
                <Link to={`/product/${product._id || product.id}`}>
                    <div className="relative h-64 overflow-hidden bg-gradient-to-b from-effue-dark to-black">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-image w-full h-full object-contain p-6 transition-transform duration-500"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white font-medium tracking-wider">Quick View</span>
                        </div>
                    </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className="fill-effue-gold text-effue-gold" />
                        ))}
                        <span className="text-gray-500 text-xs ml-2">(4.9)</span>
                    </div>

                    <Link to={`/product/${product._id || product.id}`}>
                        <h3 className="text-lg font-display font-semibold text-white group-hover:text-effue-gold transition-colors mb-2">
                            {product.name}
                        </h3>
                    </Link>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-2xl font-bold text-effue-gold">₹{product.price}</span>
                            <span className="text-gray-500 text-sm line-through ml-2">₹{product.price + 500}</span>
                        </div>
                        <motion.button
                            onClick={handleAddToCart}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-effue-gold text-effue-black rounded-full hover:bg-effue-gold-light transition-colors"
                        >
                            <ShoppingBag size={18} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
