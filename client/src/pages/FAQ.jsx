import React from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
    const faqs = [
        {
            question: "Are Effue fragrances long-lasting?",
            answer: "Yes, our luxury perfumes are formulated with high-quality ingredients and a strong concentration of perfume oils (Eau de Parfum or Extrait de Parfum), ensuring they last 8-12 hours depending on skin chemistry and environmental factors."
        },
        {
            question: "Are your ingredients vegan and cruelty-free?",
            answer: "Absolutely. We pride ourselves on using ethically sourced ingredients and we never test our finished products or ingredients on animals."
        },
        {
            question: "How should I store my perfume?",
            answer: "To preserve your fragrance, store it in a cool, dry place away from direct sunlight and extreme temperatures. Keep the bottle upright and closed tightly when not in use."
        },
        {
            question: "Do you offer samples or discovery sets?",
            answer: "Yes, we offer Discovery Sets featuring 2ml vials of our signature scents so you can experience them before committing to a full-size bottle."
        }
    ];

    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen text-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-display font-bold mb-8">
                    Frequently Asked <span className="text-gold-gradient">Questions</span>
                </h1>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="glass p-8 rounded-lg">
                            <h3 className="text-xl font-bold text-effue-gold mb-3">{faq.question}</h3>
                            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
