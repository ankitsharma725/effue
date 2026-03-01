import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-effue-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-block mb-2">
                            <img src="/assets/logo.png" alt="EFFUE" className="h-12 w-auto object-contain" />
                        </Link>
                        <p className="text-gray-400 mt-4 mb-6">
                            Luxury fragrances crafted for those who appreciate the extraordinary.
                            Made in Jaipur, loved worldwide.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter, Youtube].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-effue-gold hover:text-effue-black transition-all"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Collection', 'Our Story', 'Contact'].map(link => (
                                <li key={link}>
                                    <Link
                                        to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-effue-gold transition-colors"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-3">
                            <li><Link to="/shipping-info" className="text-gray-400 hover:text-effue-gold transition-colors">Shipping Info</Link></li>
                            <li><Link to="/returns" className="text-gray-400 hover:text-effue-gold transition-colors">Returns</Link></li>
                            <li><Link to="/faq" className="text-gray-400 hover:text-effue-gold transition-colors">FAQ</Link></li>
                            <li><Link to="/track-order" className="text-gray-400 hover:text-effue-gold transition-colors">Track Order</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-400">
                                <MapPin size={16} className="text-effue-gold" />
                                Sanganer, Jaipur, Rajasthan
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone size={16} className="text-effue-gold" />
                                +91 8890103630
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail size={16} className="text-effue-gold" />
                                krishnajoshi4347936@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2024 Effue Luxury Parfums. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-effue-gold transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-effue-gold transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
