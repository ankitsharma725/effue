import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User, LogOut, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { cartCount } = useCart();
    const { wishlist } = useWishlist();
    const { isAuthenticated, logout, user } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Collection', path: '/products' },
        { name: 'Our Story', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            src="/assets/logo.png"
                            alt="EFFUE"
                            className="h-10 md:h-12 w-auto object-contain"
                        />
                        <span className="hidden md:block text-xs text-gray-400 tracking-[0.3em] uppercase border-l border-effue-gold pl-3">
                            Luxury Parfums
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative text-sm tracking-widest uppercase transition-colors duration-300 ${location.pathname === link.path
                                    ? 'text-effue-gold'
                                    : 'text-gray-300 hover:text-effue-gold'
                                    }`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 right-0 h-px bg-effue-gold"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex items-center">
                            <AnimatePresence>
                                {searchOpen && (
                                    <motion.form
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 200, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        onSubmit={handleSearch}
                                        className="absolute right-8 mr-2 overflow-hidden"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            autoFocus
                                            className="w-full bg-effue-dark/80 text-white text-sm px-3 py-1 rounded-full border border-effue-gold/50 focus:outline-none focus:border-effue-gold placeholder-gray-500"
                                        />
                                    </motion.form>
                                )}
                            </AnimatePresence>
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 text-gray-300 hover:text-effue-gold transition-colors block"
                            >
                                {searchOpen ? <X size={20} /> : <Search size={20} />}
                            </button>
                        </div>
                        {isAuthenticated ? (
                            <div className="group relative z-40">
                                <button className="p-2 text-effue-gold transition-colors flex items-center gap-1 group-hover:text-white">
                                    <User size={20} />
                                    <span className="text-xs uppercase hidden lg:inline">{user?.name?.split(' ')[0] || 'User'}</span>
                                </button>
                                {/* Dropdown menu */}
                                <div className="absolute top-10 right-0 w-32 bg-effue-dark border border-white/10 rounded overflow-hidden shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-effue-gold hover:text-effue-black transition flex items-center gap-2"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="p-2 text-gray-300 hover:text-effue-gold transition-colors">
                                <User size={20} />
                            </Link>
                        )}
                        <Link to="/wishlist" className="relative p-2 text-gray-300 hover:text-effue-gold transition-colors">
                            <Heart size={20} />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-effue-rose text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                        <Link to="/cart" className="relative p-2 text-gray-300 hover:text-effue-gold transition-colors">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-effue-gold text-effue-black text-xs font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            className="md:hidden p-2 text-gray-300"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-effue-black"
                    >
                        <div className="flex flex-col h-full p-6">
                            <div className="flex justify-between items-center mb-12">
                                <img src="/assets/logo.png" alt="EFFUE" className="h-8 w-auto object-contain" />
                                <button onClick={() => setIsMobileMenuOpen(false)}>
                                    <X size={28} className="text-gray-300" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-3xl font-display text-gray-300 hover:text-effue-gold transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
