// services/homeService.js
const API_BASE_URL = 'http://localhost:8080';

const fetchConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
};

export const obtenerProductosHome = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo productos del home:', error);
        throw error;
    }
};

export const obtenerProductoDetalle = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/productohome/${id}`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo detalle del producto:', error);
        throw error;
    }
};

export const agregarAlCarrito = async (productoData) => {
    try {
        const formData = new FormData();
        formData.append('id', productoData.id);
        formData.append('cantidad', productoData.cantidad);

        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error agregando al carrito:', error);
        throw error;
    }
};

export const eliminarDelCarrito = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/delete/cart/${id}`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error eliminando del carrito:', error);
        throw error;
    }
};

export const obtenerCarrito = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/getCart`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo carrito:', error);
        throw error;
    }
};

export const procesarOrden = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/order`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error procesando orden:', error);
        throw error;
    }
};

export const guardarOrden = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/saveOrder`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error guardando orden:', error);
        throw error;
    }
};

export const buscarProductos = async (termino) => {
    try {
        const formData = new FormData();
        formData.append('nombre', termino);

        const response = await fetch(`${API_BASE_URL}/search`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error buscando productos:', error);
        throw error;
    }
};