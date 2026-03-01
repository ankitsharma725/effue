// Backend API ka base URL
const API_URL = 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
    // Products
    products: `${API_URL}/products`,
    product: (id) => `${API_URL}/products/${id}`,

    // Auth
    login: `${API_URL}/users/login`,
    register: `${API_URL}/users/register`,
    profile: `${API_URL}/users/profile`,

    // Cart
    cart: `${API_URL}/cart`,
    addToCart: `${API_URL}/cart/add`,
    removeFromCart: (itemId) => `${API_URL}/cart/remove/${itemId}`,
    clearCart: `${API_URL}/cart/clear`,

    // Orders
    orders: `${API_URL}/orders`,
    myOrders: `${API_URL}/orders/my-orders`,

    // Payment
    createOrder: `${API_URL}/payment/create-order`,
    verifyPayment: `${API_URL}/payment/verify`
};

export default API_URL;
