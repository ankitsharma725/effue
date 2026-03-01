import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { API_ENDPOINTS } from '../config/api';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const { token, api } = useAuth();

    useEffect(() => {
        if (token) {
            fetchCart();
        } else {
            setCart(null);
            setCartCount(0);
        }
    }, [token]);

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setCart(response.data);
            updateCartCount(response.data.items);
        } catch (error) {
            console.error('Fetch cart error:', error);
        }
    };

    const updateCartCount = (items) => {
        const count = items?.reduce((total, item) => total + item.quantity, 0) || 0;
        setCartCount(count);
    };

    const addToCart = async (productId, quantity, size) => {
        try {
            const response = await api.post(API_ENDPOINTS.addToCart, {
                productId, quantity, size
            });
            setCart(response.data);
            updateCartCount(response.data.items);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to add to cart'
            };
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const response = await api.delete(API_ENDPOINTS.removeFromCart(itemId));
            setCart(response.data);
            updateCartCount(response.data.items);
            return { success: true };
        } catch (error) {
            return { success: false, message: 'Failed to remove' };
        }
    };

    const clearCart = async () => {
        try {
            const response = await api.delete(API_ENDPOINTS.clearCart);
            setCart(response.data);
            setCartCount(0);
            return { success: true };
        } catch (error) {
            return { success: false, message: 'Failed to clear cart' };
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            cartCount,
            addToCart,
            removeFromCart,
            clearCart,
            fetchCart,
            cartTotal: cart?.totalAmount || 0
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
