// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const productosService = {
    getAll: () => api.get('/productos'),
    getById: (id) => api.get(`/productos/${id}`),
    create: (data) => api.post('/productos', data),
    update: (id, data) => api.put(`/productos/${id}`, data),
    delete: (id) => api.delete(`/productos/${id}`),
    getCart: () => api.get('/cart'),
    addToCart: (data) => api.post('/cart', data),
    removeFromCart: (id) => api.delete(`/cart/${id}`),
    createOrder: () => api.post('/orders'),
    getOrdenes: () => api.get('/orders'),
    getOrdenById: (id) => api.get(`/orders/${id}`),
};

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    registro: (userData) => api.post('/auth/registro', userData),
    logout: () => api.post('/auth/logout'),
    checkAuth: () => api.get('/auth/check'),
};

export const adminService = {
    getUsers: () => api.get('/admin/users'),
    updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    getStats: () => api.get('/admin/stats'),
};

export default api;