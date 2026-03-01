import React, { createContext, useState, useEffect, useContext } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('effue_wishlist');
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (e) {
                console.error("Failed to parse wishlist");
            }
        }
    }, []);

    const saveWishlist = (newWishlist) => {
        setWishlist(newWishlist);
        localStorage.setItem('effue_wishlist', JSON.stringify(newWishlist));
    };

    const addToWishlist = (product) => {
        const itemExists = wishlist.find(item => item._id === product._id || item.id === product._id || item.id === product.id);
        if (!itemExists) {
            const newItem = {
                _id: product._id || product.id,
                id: product.id || product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category || ''
            };
            saveWishlist([...wishlist, newItem]);
            return true;
        }
        return false;
    };

    const removeFromWishlist = (productId) => {
        const newWishlist = wishlist.filter(item => item._id !== productId && item.id !== productId);
        saveWishlist(newWishlist);
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId || item.id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
