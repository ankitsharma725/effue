import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const cartItems = cart?.items || [];
    const totalAmount = cart?.totalAmount || cartItems.reduce((acc, item) => acc + (item.price * (item.qty || item.quantity || 1)), 0);

    const [isSuccess, setIsSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Razorpay'); // or 'COD'
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        pincode: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (paymentMethod === 'Razorpay') {
                // Initialize Razorpay
                const response = await axios.post(API_ENDPOINTS.createOrder || 'http://localhost:5000/api/payment/create-order', {
                    amount: totalAmount
                });

                const { orderId, amount } = response.data;
                const options = {
                    key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_SLyRICMLZNQU7y',
                    amount: amount,
                    currency: "INR",
                    name: "Effue Perfumes",
                    description: "Luxury Fragrance Purchase",
                    image: "/assets/logo.png",
                    order_id: orderId,
                    handler: async function (paymentResponse) {
                        try {
                            const verifyData = {
                                razorpay_order_id: paymentResponse.razorpay_order_id,
                                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                                razorpay_signature: paymentResponse.razorpay_signature
                            };

                            // Verify payment
                            const verifyRes = await axios.post(API_ENDPOINTS.verifyPayment || 'http://localhost:5000/api/payment/verify', verifyData);

                            if (verifyRes.data.success) {
                                // Payment successful, place order
                                const orderPayload = {
                                    orderItems: cartItems.map(item => ({
                                        name: item.name,
                                        quantity: item.qty || item.quantity || 1,
                                        image: item.image,
                                        price: item.price,
                                        product: item.id || item._id,
                                        size: item.size
                                    })),
                                    shippingAddress: {
                                        address: formData.address,
                                        city: formData.city,
                                        postalCode: formData.pincode,
                                        country: 'India'
                                    },
                                    paymentMethod: 'Razorpay',
                                    paymentResult: {
                                        id: paymentResponse.razorpay_payment_id,
                                        status: 'paid',
                                        update_time: new Date().toISOString()
                                    },
                                    totalPrice: totalAmount
                                };

                                await axios.post(API_ENDPOINTS.orders || 'http://localhost:5000/api/orders', orderPayload);
                                setIsSuccess(true);
                                clearCart();
                                setTimeout(() => { navigate('/'); }, 3000);
                            }
                        } catch (err) {
                            console.error('Payment verification failed', err);
                            alert('Payment verification failed.');
                            setSubmitting(false);
                        }
                    },
                    prefill: {
                        name: formData.name,
                        email: formData.email,
                        contact: formData.phone
                    },
                    theme: {
                        color: "#C6A87C"
                    }
                };

                const extWindow = window;
                if (extWindow.Razorpay) {
                    const rzp1 = new extWindow.Razorpay(options);
                    rzp1.on('payment.failed', function (response) {
                        alert(response.error.description);
                        setSubmitting(false);
                    });
                    rzp1.open();
                } else {
                    alert('Razorpay loading failed. Check your connection.');
                    setSubmitting(false);
                }

            } else {
                // COD Flow
                const orderPayload = {
                    orderItems: cartItems.map(item => ({
                        name: item.name,
                        quantity: item.qty || item.quantity || 1,
                        image: item.image,
                        price: item.price,
                        product: item.id || item._id,
                        size: item.size
                    })),
                    shippingAddress: {
                        address: formData.address,
                        city: formData.city,
                        postalCode: formData.pincode,
                        country: 'India'
                    },
                    paymentMethod: 'Cash On Delivery',
                    totalPrice: totalAmount
                };

                await axios.post(API_ENDPOINTS.orders || 'http://localhost:5000/api/orders', orderPayload);

                setIsSuccess(true);
                clearCart();

                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            console.error('Failed to initiate order:', error);
            const msg = error.response?.data?.message || error.message || 'Unknown error occurred.';
            alert(`Failed to initiate order: ${msg}`);
            setSubmitting(false);
        } finally {
            setSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="pt-32 pb-16 bg-effue-black min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass p-12 rounded-2xl text-center max-w-md w-full border border-effue-gold/30"
                >
                    <CheckCircle className="w-24 h-24 text-effue-gold mx-auto mb-6" />
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Order Placed!</h2>
                    <p className="text-gray-300 mb-8">Thank you for your purchase. We have received your order and will process it shortly.</p>
                    <Link to="/products" className="btn-luxury block w-full py-3">
                        Continue Shopping
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="pt-24 pb-16 bg-effue-black min-h-screen">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-display font-bold text-white mb-8">
                        Session <span className="text-gold-gradient">Expired</span>
                    </h1>
                    <p className="text-gray-400 mb-6">Your cart is empty. Cannot proceed to checkout.</p>
                    <Link to="/products" className="btn-luxury">Go to Collection</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-12 text-center">
                    Secure <span className="text-gold-gradient">Checkout</span>
                </h1>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Shipping Details Form */}
                    <div className="glass p-8 rounded-lg order-2 lg:order-1">
                        <h2 className="text-2xl font-bold text-white mb-6">Delivery Details</h2>
                        <form onSubmit={handlePlaceOrder} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold" placeholder="John Doe" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Phone</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold" placeholder="+91 9999999999" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Shipping Address</label>
                                <textarea required name="address" value={formData.address} onChange={handleInputChange} rows="3" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold resize-none" placeholder="123 Luxury Avenue, Apartment 4B"></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">City/State</label>
                                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold" placeholder="Mumbai, Maharashtra" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Pincode</label>
                                    <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold" placeholder="400001" />
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4">Payment Method</h3>
                                <div className="space-y-3">
                                    <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Razorpay' ? 'border-effue-gold bg-effue-gold/10' : 'border-white/10 bg-white/5 hover:border-effue-gold/50'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="paymentMethod" value="Razorpay" checked={paymentMethod === 'Razorpay'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-effue-gold" />
                                                <span className="text-white font-medium">Pay Online (Razorpay)</span>
                                            </div>
                                            {paymentMethod === 'Razorpay' && <CheckCircle className="text-effue-gold w-5 h-5" />}
                                        </div>
                                    </label>

                                    <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-effue-gold bg-effue-gold/10' : 'border-white/10 bg-white/5 hover:border-effue-gold/50'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-effue-gold" />
                                                <span className="text-white font-medium">Cash On Delivery (COD)</span>
                                            </div>
                                            {paymentMethod === 'COD' && <CheckCircle className="text-effue-gold w-5 h-5" />}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button disabled={submitting} type="submit" className="w-full btn-luxury mt-8 py-4 text-lg disabled:opacity-50">
                                {submitting ? 'Processing...' : `Place Order - ₹${totalAmount}`}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="glass p-8 rounded-lg h-fit sticky top-24 order-1 lg:order-2">
                        <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-4 items-center bg-white/5 p-3 rounded-lg">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded bg-black/20" />
                                    <div className="flex-1">
                                        <h4 className="text-white font-medium text-sm">{item.name}</h4>
                                        <p className="text-gray-400 text-xs">Size: {item.size}</p>
                                        <p className="text-gray-400 text-xs">Qty: {item.qty || item.quantity || 1}</p>
                                    </div>
                                    <span className="text-effue-gold font-bold">₹{item.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/10 text-gray-400">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-white">₹{totalAmount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-500">Free</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                <span className="text-lg text-white font-bold">Total Details</span>
                                <span className="text-2xl font-bold text-effue-gold">₹{totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
