import api from './api';

export const obtenerProductos = async () => {
    const response = await api.get('/productos');
    return response.data;
};

export const obtenerProducto = async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
};

export const crearProducto = async (producto) => {
    const response = await api.post('/productos', producto);
    return response.data;
};

export const actualizarProducto = async (id, producto) => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
};

export const eliminarProducto = async (id) => {
    await api.delete(`/productos/${id}`);
};