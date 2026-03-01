import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Globe, Gem } from 'lucide-react';

const values = [
    {
        icon: Gem,
        title: 'Premium Quality',
        description: 'Only the finest ingredients sourced from around the world'
    },
    {
        icon: Heart,
        title: 'Made with Love',
        description: 'Handcrafted in small batches in Jaipur, India'
    },
    {
        icon: Globe,
        title: 'Global Standards',
        description: 'International fragrance quality at accessible prices'
    },
    {
        icon: Award,
        title: 'Lasting Legacy',
        description: 'Scents that linger for 24+ hours'
    }
];

const About = () => {
    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen">
            {/* Hero */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.1)_0%,_transparent_70%)]" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-effue-gold tracking-widest uppercase text-sm">Our Story</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mt-4 mb-8">
                            The Art of <span className="text-gold-gradient">Effue</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            Founded by Ankit Sharma in the heart of Sanganer, Jaipur, Effue was born
                            from a passion to bring luxury fragrances to every individual who appreciates
                            the finer things in life.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                                From Jaipur to the World
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Effue is not just a perfume — it is a statement of identity. Inspired by
                                the rich heritage of French perfumery and the opulence of Arabian scents,
                                we blend traditional craftsmanship with modern elegance.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Every bottle of Effue represents our commitment to excellence: long-lasting
                                performance, premium glass packaging, and international fragrance standards
                                — all at a price that makes luxury accessible.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                We believe fragrance is not worn — it is remembered. Each scent is designed
                                to create lasting impressions and evoke emotions that stay with you throughout
                                the day.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-lg overflow-hidden">
                                <img
                                    src="/assets/jaipur.jpg"
                                    alt="Jaipur Heritage"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-effue-black/80 to-transparent" />
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white font-display text-xl">Sanganer, Jaipur</p>
                                <p className="text-gray-400 text-sm">The Home of Effue</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 px-6 bg-effue-dark">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-effue-gold tracking-widest uppercase text-sm">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-4">
                            Our Promise
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-effue-gold/10 flex items-center justify-center">
                                    <value.icon size={28} className="text-effue-gold" />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-white mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-400 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder Quote */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="text-6xl text-effue-gold/20 font-display absolute -top-8 left-0">"</div>
                        <blockquote className="text-2xl md:text-3xl font-display text-white italic leading-relaxed mb-6">
                            We don't just create perfumes; we craft memories that linger long after
                            you've left the room. Every drop of Effue is a promise of excellence.
                        </blockquote>
                        <div className="text-effue-gold font-semibold">— Ankit Sharma</div>
                        <div className="text-gray-500 text-sm">Founder, Effue Luxury Parfums</div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
