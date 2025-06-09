// services/usuarioService.js
const API_BASE_URL = 'http://localhost:8080';

const fetchConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
};

export const registrarUsuario = async (userData) => {
    try {
        const formData = new FormData();
        Object.keys(userData).forEach(key => {
            formData.append(key, userData[key]);
        });

        const response = await fetch(`${API_BASE_URL}/usuario/save`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error registrando usuario:', error);
        throw error;
    }
};

export const iniciarSesion = async (credentials) => {
    try {
        const formData = new FormData();
        formData.append('username', credentials.email);
        formData.append('password', credentials.password);

        const response = await fetch(`${API_BASE_URL}/usuario/login`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Credenciales inválidas');
        }

        return response;
    } catch (error) {
        console.error('Error iniciando sesión:', error);
        throw error;
    }
};

export const obtenerComprasUsuario = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/usuario/compras`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo compras:', error);
        throw error;
    }
};

export const obtenerDetalleCompra = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/usuario/detalle/${id}`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo detalle de compra:', error);
        throw error;
    }
};

export const descargarFactura = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/usuario/factura/${id}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Crear blob y descargar archivo
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `factura-${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error descargando factura:', error);
        throw error;
    }
};

export const cerrarSesion = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/usuario/logout`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error cerrando sesión:', error);
        throw error;
    }
};