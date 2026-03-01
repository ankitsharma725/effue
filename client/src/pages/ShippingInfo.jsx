import React from 'react';

const ShippingInfo = () => {
    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen text-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-display font-bold mb-8">
                    Shipping <span className="text-gold-gradient">Information</span>
                </h1>
                <div className="glass p-8 rounded-lg space-y-6 text-gray-300 leading-relaxed">
                    <h2 className="text-2xl font-bold text-effue-gold">Delivery Partners</h2>
                    <p>We partner with premium courier services to ensure your luxury fragrances are delivered safely and on time. All our shipments are fully insured.</p>

                    <h2 className="text-2xl font-bold text-effue-gold">Processing Time</h2>
                    <p>Orders are typically processed within 1-2 business days. During peak seasons or promotional events, processing might take up to 3 business days.</p>

                    <h2 className="text-2xl font-bold text-effue-gold">Standard Shipping</h2>
                    <p>Delivery takes 3-5 business days across India. We offer free standard shipping on all orders above ₹999.</p>

                    <h2 className="text-2xl font-bold text-effue-gold">Express Shipping</h2>
                    <p>Need it sooner? Select Express Shipping at checkout for 1-2 business days delivery for a nominal fee.</p>

                    <h2 className="text-2xl font-bold text-effue-gold">International Shipping</h2>
                    <p>Currently, we ship only within India. We are working diligently to bring Effue fragrances to our international patrons soon.</p>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;
