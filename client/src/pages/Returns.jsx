import React from 'react';
import { motion } from 'framer-motion';

const Returns = () => {
    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen text-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-display font-bold mb-8">
                    Returns & <span className="text-gold-gradient">Exchanges</span>
                </h1>
                <div className="glass p-8 rounded-lg space-y-6 text-gray-300 leading-relaxed">
                    <p>
                        Your satisfaction with Effue Luxury Parfums is our priority. If you happen to receive a damaged or incorrect product,
                        we offer a seamless Return and Exchange policy.
                    </p>

                    <h2 className="text-2xl font-bold text-effue-gold">Our Return Policy</h2>
                    <p>Due to the personal nature of our products, we do not accept returns on used fragrances or opened boxes unless there is a defect or damage upon arrival.</p>

                    <h2 className="text-2xl font-bold text-effue-gold">Timeframe</h2>
                    <p>Any claims regarding damaged or incorrect items must be reported within 48 hours of delivery.</p>

                    <h2 className="text-2xl font-bold text-effue-gold">How to initiate a return?</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Send us an email at krishnajoshi4347936@gmail.com with your order ID.</li>
                        <li>Attach clear photos showing the defect or damage.</li>
                        <li>Once our team approves the claim, we will arrange a reverse pickup.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-effue-gold">Refund Processing</h2>
                    <p>Refunds will be processed to the original payment method within 5-7 business days after we receive and inspect the returned item.</p>
                </div>
            </div>
        </div>
    );
};

export default Returns;
