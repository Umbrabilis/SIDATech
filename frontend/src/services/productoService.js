// services/productoService.js
const API_BASE_URL = 'http://localhost:8080';

// Configuración base para las peticiones
const fetchConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include' // Para incluir cookies de sesión
};

export const obtenerProductos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/productos`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        throw error;
    }
};

export const obtenerProducto = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/edit/${id}`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo producto:', error);
        throw error;
    }
};

export const crearProducto = async (productoData) => {
    try {
        const formData = new FormData();

        // Agregar campos del producto
        Object.keys(productoData).forEach(key => {
            if (key !== 'imagen') {
                formData.append(key, productoData[key]);
            }
        });

        // Manejar imagen si existe
        if (productoData.imagen && productoData.imagen instanceof File) {
            formData.append('img', productoData.imagen);
        }

        const response = await fetch(`${API_BASE_URL}/productos/save`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error creando producto:', error);
        throw error;
    }
};

export const actualizarProducto = async (id, productoData) => {
    try {
        const formData = new FormData();
        formData.append('id', id);

        // Agregar campos del producto
        Object.keys(productoData).forEach(key => {
            if (key !== 'imagen') {
                formData.append(key, productoData[key]);
            }
        });

        // Manejar imagen si existe
        if (productoData.imagen && productoData.imagen instanceof File) {
            formData.append('img', productoData.imagen);
        }

        const response = await fetch(`${API_BASE_URL}/productos/update`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error actualizando producto:', error);
        throw error;
    }
};

export const eliminarProducto = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/delete/${id}`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error eliminando producto:', error);
        throw error;
    }
};