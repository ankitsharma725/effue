import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        // Since backend order tracking might not be fully linked, mock it for now
        setStatus({
            status: "In Transit",
            expected: "In 2 Days",
            message: "Your luxury fragrance is on its way via Bluedart. Current Location: Jaipur Hub."
        });
    };

    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen text-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-display font-bold mb-8 text-center text-white">
                    Track Your <span className="text-gold-gradient">Order</span>
                </h1>

                <div className="glass p-8 rounded-lg max-w-xl mx-auto">
                    <p className="text-gray-400 mb-6 text-center">
                        Enter your Order ID below to check the real-time status of your shipment.
                    </p>

                    <form onSubmit={handleTrack} className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Order ID e.g. EFF10023"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                            className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-effue-gold"
                        />
                        <button type="submit" className="btn-luxury px-6 flex items-center justify-center gap-2">
                            <Search size={18} />
                            Track
                        </button>
                    </form>

                    {status && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 p-6 bg-effue-gold/10 border border-effue-gold/30 rounded-lg"
                        >
                            <h3 className="text-xl font-bold text-effue-gold mb-2">Status: {status.status}</h3>
                            <p className="text-gray-300 font-medium mb-1">Expected Delivery: {status.expected}</p>
                            <p className="text-gray-400 text-sm">{status.message}</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
