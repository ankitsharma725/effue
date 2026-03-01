import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Users, ShoppingCart, TrendingUp, X, Plus, Edit2, Trash2 } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [dashboardData, setDashboardData] = useState({
        totalOrders: 0,
        totalUsers: 0,
        revenue: 0
    });

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        gender: '',
        description: '',
        image: '',
        inStock: true
    });

    const fetchDashboardStats = async () => {
        try {
            const [productsRes, usersRes, ordersRes] = await Promise.all([
                axios.get(API_ENDPOINTS.products || 'http://localhost:5000/api/products'),
                axios.get('http://localhost:5000/api/users').catch(() => ({ data: [] })),
                axios.get('http://localhost:5000/api/orders').catch(() => ({ data: [] }))
            ]);

            setProducts(productsRes.data);

            const orders = ordersRes.data || [];
            const revenue = orders.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

            setDashboardData({
                totalOrders: orders.length,
                totalUsers: (usersRes.data || []).length,
                revenue: revenue
            });
        } catch (error) {
            console.error("Error fetching admin dashboard data", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setCurrentProduct(product);
            setFormData({
                name: product.name,
                price: product.price,
                category: product.category,
                gender: product.gender || 'Unisex',
                description: product.description,
                image: product.image,
                inStock: product.inStock
            });
        } else {
            setCurrentProduct(null);
            setFormData({
                name: '',
                price: '',
                category: '',
                gender: 'Unisex',
                description: '',
                image: '',
                inStock: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = currentProduct ? {
                ...currentProduct,
                ...formData,
                price: Number(formData.price)
            } : {
                ...formData,
                price: Number(formData.price),
                sizes: ['50ml', '100ml'],
                gallery: [formData.image],
                notes: { top: [], middle: [], base: [] }
            };

            const url = API_ENDPOINTS.products || 'http://localhost:5000/api/products';

            if (currentProduct) {
                // Update
                const updateUrl = API_ENDPOINTS.product ? API_ENDPOINTS.product(currentProduct._id || currentProduct.id) : `${url}/${currentProduct._id || currentProduct.id}`;
                await axios.put(updateUrl, payload);
            } else {
                // Create
                await axios.post(url, payload);
            }
            fetchDashboardStats();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving product', error);
            alert('Failed to save product. Check console logs.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const url = API_ENDPOINTS.products || 'http://localhost:5000/api/products';
            const deleteUrl = API_ENDPOINTS.product ? API_ENDPOINTS.product(id) : `${url}/${id}`;
            await axios.delete(deleteUrl);
            fetchDashboardStats();
        } catch (error) {
            console.error("Error deleting product", error);
            alert('Failed to delete product. Database connection drop or ID error.');
        }
    };

    const stats = [
        { title: 'Total Products', value: products.length, icon: Package, color: 'text-blue-500' },
        { title: 'Total Orders', value: dashboardData.totalOrders, icon: ShoppingCart, color: 'text-green-500' },
        { title: 'Total Users', value: dashboardData.totalUsers, icon: Users, color: 'text-purple-500' },
        { title: 'Revenue', value: `₹${dashboardData.revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-effue-gold' },
    ];

    return (
        <div className="pt-24 pb-16 bg-effue-black min-h-screen relative">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-display font-bold text-white mb-8">
                    Admin <span className="text-gold-gradient">Dashboard</span>
                </h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-6 rounded-lg flex items-center justify-between"
                        >
                            <div>
                                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            </div>
                            <div className={`p-4 rounded-full bg-white/5 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Products Section */}
                <div className="glass p-8 rounded-lg min-h-[500px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-display font-bold text-white">Products Management</h2>
                        <button onClick={() => handleOpenModal()} className="btn-luxury py-2 px-6 flex items-center gap-2">
                            <Plus size={18} /> Add Product
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center text-effue-gold py-10">Loading products...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-gray-300">
                                <thead className="text-sm uppercase text-gray-400 border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id || product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 flex items-center gap-4">
                                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover bg-white/5" />
                                                <span className="font-medium text-white max-w-[200px] truncate">{product.name}</span>
                                            </td>
                                            <td className="px-6 py-4">{product.category}</td>
                                            <td className="px-6 py-4 text-effue-gold font-bold">₹{product.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs ${product.inStock ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleOpenModal(product)} className="text-blue-400 hover:text-blue-300 mx-3 p-2 hover:bg-blue-400/10 rounded-full transition-colors">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(product._id || product.id)} className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-full transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No products found. Start adding some!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Product Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-[#1A1A1A] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 p-8 shadow-2xl"
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <h3 className="text-2xl font-bold text-white mb-6">
                                    {currentProduct ? 'Edit Product' : 'Add New Product'}
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Name</label>
                                            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold" placeholder="Product Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Price (₹)</label>
                                            <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold" placeholder="e.g. 1999" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Category</label>
                                            <input required type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold" placeholder="e.g. Floral, Oud..." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Gender</label>
                                            <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-[#2A2A2A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold">
                                                <option value="Unisex">Unisex</option>
                                                <option value="Men">Men</option>
                                                <option value="Women">Women</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Image URL</label>
                                        <input required type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold" placeholder="/assets/your-image.jpg or http..." />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Description</label>
                                        <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-effue-gold resize-none" placeholder="Product description..."></textarea>
                                    </div>

                                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg border border-white/10 bg-white/5">
                                        <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleInputChange} className="w-5 h-5 accent-effue-gold" />
                                        <span className="text-white font-medium">Currently in stock</span>
                                    </label>

                                    <div className="pt-4 flex justify-end gap-4">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn-luxury px-8">
                                            {currentProduct ? 'Save Changes' : 'Create Product'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Admin;
