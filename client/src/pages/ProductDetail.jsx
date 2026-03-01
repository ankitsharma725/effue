import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Heart, Share2, Truck, Shield, RefreshCcw, Loader, MessageCircle, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isShareOpen, setIsShareOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[1] || data.sizes[0]);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="pt-24 min-h-screen bg-effue-black flex justify-center items-center">
                <Loader size={48} className="text-effue-gold animate-spin" />
            </div>
        );
    }

    if (!product) {
        return <div className="pt-24 text-center text-white bg-effue-black min-h-screen">Product not found</div>;
    }

    const isWished = isInWishlist(product._id || product.id);

    const handleWishlist = () => {
        if (isWished) {
            removeFromWishlist(product._id || product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Check out this luxury perfume: ${product.name}`;

        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                alert("Link copied to clipboard!");
                break;
        }
        setIsShareOpen(false);
    };

    const sizePrices = {
        '30ml': product.price * 0.6,
        '50ml': product.price,
        '100ml': product.price * 1.6
    };

    const handleAddToCart = (redirectPath = '/cart') => {
        const currentPrice = sizePrices[selectedSize] || product.price;
        addToCart({
            id: product._id || product.id,
            name: product.name,
            price: currentPrice,
            image: product.image
        }, quantity, selectedSize);

        // Optional: Provide feedback to user or navigate to cart
        navigate(redirectPath);
    };

    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="relative aspect-square bg-gradient-to-b from-effue-dark to-black rounded-lg overflow-hidden">
                            <img
                                src={product.gallery && product.gallery.length > 0 ? product.gallery[activeImage] : product.image}
                                alt={product.name}
                                className="w-full h-full object-contain p-8"
                            />
                            <div className="absolute inset-0 bg-effue-gold/5" />
                        </div>
                        {product.gallery && product.gallery.length > 1 && (
                            <div className="flex gap-4">
                                {product.gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-effue-gold' : 'border-transparent'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div>
                            <span className="text-effue-gold tracking-widest uppercase text-sm">
                                {product.category} • {product.gender}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mt-2">
                                {product.name}
                            </h1>
                        </div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-bold text-effue-gold">
                                ₹{Math.round(sizePrices[selectedSize] || product.price) * quantity}
                            </span>
                            <span className="text-gray-500 line-through">
                                ₹{Math.round((sizePrices[selectedSize] || product.price) * 1.2) * quantity}
                            </span>
                            <span className="text-green-500 text-sm">Save 20%</span>
                        </div>

                        <p className="text-gray-400 leading-relaxed text-lg">
                            {product.description}
                        </p>

                        <div>
                            <label className="text-white font-medium mb-3 block">Select Size</label>
                            <div className="flex gap-3">
                                {product.sizes?.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-lg border transition-all ${selectedSize === size
                                            ? 'border-effue-gold bg-effue-gold/10 text-effue-gold'
                                            : 'border-white/20 text-gray-300 hover:border-effue-gold/50'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-white font-medium mb-3 block">Quantity</label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-gray-300 hover:border-effue-gold hover:text-effue-gold transition-colors"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="text-xl font-semibold text-white w-8 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-gray-300 hover:border-effue-gold hover:text-effue-gold transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex gap-4">
                                <motion.button
                                    onClick={() => handleAddToCart()}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 btn-luxury flex items-center justify-center gap-2 py-4"
                                >
                                    <ShoppingBag size={20} />
                                    Add to Cart
                                </motion.button>
                                <motion.button
                                    onClick={handleWishlist}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-4 border rounded-lg transition-colors ${isWished ? 'border-effue-rose bg-effue-rose/10 text-effue-rose' : 'border-white/20 text-gray-300 hover:border-effue-gold hover:text-effue-gold'}`}
                                >
                                    <Heart size={24} className={isWished ? 'fill-effue-rose' : ''} />
                                </motion.button>
                                <div className="relative">
                                    <motion.button
                                        onClick={() => setIsShareOpen(!isShareOpen)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-4 border border-white/20 rounded-lg text-gray-300 hover:border-effue-gold hover:text-effue-gold transition-colors"
                                    >
                                        <Share2 size={24} />
                                    </motion.button>

                                    <AnimatePresence>
                                        {isShareOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute bottom-full right-0 mb-2 w-48 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-xl overflow-hidden z-20"
                                            >
                                                <button onClick={() => handleShare('whatsapp')} className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-300 hover:bg-white/5 hover:text-effue-gold transition-colors">
                                                    <MessageCircle size={16} /> WhatsApp
                                                </button>
                                                <button onClick={() => handleShare('facebook')} className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-300 hover:bg-white/5 hover:text-effue-gold transition-colors border-t border-white/5">
                                                    <Facebook size={16} /> Facebook
                                                </button>
                                                <button onClick={() => handleShare('twitter')} className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-300 hover:bg-white/5 hover:text-effue-gold transition-colors border-t border-white/5">
                                                    <Twitter size={16} /> Twitter (X)
                                                </button>
                                                <button onClick={() => handleShare('copy')} className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-300 hover:bg-white/5 hover:text-effue-gold transition-colors border-t border-white/5">
                                                    <LinkIcon size={16} /> Copy Link
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <motion.button
                                onClick={() => handleAddToCart('/checkout')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-effue-gold text-effue-black font-bold py-4 rounded-lg hover:bg-white transition-colors"
                            >
                                Buy Now
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <Truck size={18} className="text-effue-gold" />
                                Free Shipping
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <Shield size={18} className="text-effue-gold" />
                                Authentic
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <RefreshCcw size={18} className="text-effue-gold" />
                                Easy Returns
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-white/10">
                            <h3 className="text-xl font-display font-semibold text-white">Fragrance Notes</h3>
                            <div className="space-y-3">
                                <div className="flex gap-4">
                                    <span className="text-effue-gold w-20 font-medium">Top</span>
                                    <span className="text-gray-400">{product.notes?.top?.join(', ')}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-effue-gold w-20 font-medium">Middle</span>
                                    <span className="text-gray-400">{product.notes?.middle?.join(', ')}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-effue-gold w-20 font-medium">Base</span>
                                    <span className="text-gray-400">{product.notes?.base?.join(', ')}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
