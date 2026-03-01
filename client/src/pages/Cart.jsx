import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const cartItems = cart?.items || [];

    const totalAmount = cart?.totalAmount || cartItems.reduce((acc, item) => acc + (item.price * (item.qty || item.quantity || 1)), 0);

    console.log("Cart render check:", { CartContext, motion, Link, Trash2, ShoppingBag });

    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
                    Your <span className="text-gold-gradient">Cart</span>
                </h1>

                {cartItems.length === 0 ? (
                    <div className="glass p-8 rounded-lg text-center py-20">
                        <ShoppingBag size={48} className="mx-auto text-effue-gold/50 mb-4" />
                        <p className="text-gray-400 text-lg mb-6">Your cart is currently empty.</p>
                        <Link to="/products">
                            <button className="btn-luxury">Continue Shopping</button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <motion.div
                                    key={`${item.id}-${item.size}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass p-6 rounded-lg flex items-center gap-6"
                                >
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                                    <div className="flex-1">
                                        <Link to={`/product/${item.id}`}>
                                            <h3 className="text-xl font-display font-bold text-white hover:text-effue-gold transition-colors">{item.name}</h3>
                                        </Link>
                                        <p className="text-gray-400 text-sm mb-2">Size: {item.size}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-effue-gold font-bold">₹{item.price}</span>
                                            <span className="text-gray-300">Qty: {item.qty || item.quantity || 1}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id || item.id)}
                                        className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                            <div className="flex justify-end">
                                <button onClick={clearCart} className="text-red-400 hover:text-red-500 underline text-sm">Clear Cart</button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="glass p-8 rounded-lg h-fit sticky top-24">
                            <h2 className="text-2xl font-display font-bold text-white mb-6">Order Summary</h2>
                            <div className="space-y-4 text-gray-400 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white">₹{totalAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-500">Free</span>
                                </div>
                                <div className="h-px bg-white/10 my-4" />
                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-white font-bold">Total</span>
                                    <span className="text-2xl font-bold text-effue-gold">₹{totalAmount}</span>
                                </div>
                            </div>
                            <Link to="/checkout" className="w-full btn-luxury inline-block text-center mt-6">Proceed to Checkout</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
