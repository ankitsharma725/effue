import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert('Thank you for your message! We will get back to you soon.');
    };

    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-effue-gold tracking-widest uppercase text-sm">Get in Touch</span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                        Contact <span className="text-gold-gradient">Us</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We'd love to hear from you. Reach out for inquiries, collaborations, or just to say hello.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="glass p-8 rounded-lg">
                            <h2 className="text-2xl font-display font-semibold text-white mb-6">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-effue-gold/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-effue-gold" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Visit Us</h3>
                                        <p className="text-gray-400">
                                            Sanganer, Jaipur<br />
                                            Rajasthan, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-effue-gold/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-effue-gold" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Call Us</h3>
                                        <p className="text-gray-400">+91 8890103630</p>
                                        <p className="text-gray-500 text-sm">Mon-Sat, 10am-7pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-effue-gold/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-effue-gold" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Email Us</h3>
                                        <p className="text-gray-400">krishnajoshi4347936@gmail.com</p>
                                        <p className="text-gray-500 text-sm">We reply within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-effue-gold/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="text-effue-gold" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Business Hours</h3>
                                        <p className="text-gray-400">Monday - Saturday</p>
                                        <p className="text-gray-400">10:00 AM - 7:00 PM IST</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="glass p-2 rounded-lg h-64">
                            <div className="w-full h-full bg-effue-dark rounded flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin size={32} className="text-effue-gold mx-auto mb-2" />
                                    <p className="text-gray-400">Sanganer, Jaipur</p>
                                    <p className="text-gray-500 text-sm">Rajasthan, India</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <form onSubmit={handleSubmit} className="glass p-8 rounded-lg space-y-6">
                            <h2 className="text-2xl font-display font-semibold text-white mb-6">
                                Send us a Message
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-effue-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-effue-gold transition-colors"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full bg-effue-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-effue-gold transition-colors"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-effue-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-effue-gold transition-colors"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full bg-effue-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-effue-gold transition-colors resize-none"
                                    placeholder="Tell us how we can help you..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full btn-luxury flex items-center justify-center gap-2 py-4"
                            >
                                <Send size={18} />
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
