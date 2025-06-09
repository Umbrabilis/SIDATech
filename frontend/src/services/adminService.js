// services/adminService.js
const API_BASE_URL = 'http://localhost:8080';

const fetchConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
};

export const obtenerDashboardAdmin = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/administrador`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo dashboard admin:', error);
        throw error;
    }
};

// Gestión de usuarios
export const obtenerUsuarios = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/administrador/usuarios`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        throw error;
    }
};

export const obtenerUsuario = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/administrador/usuarios/editar/${id}`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        throw error;
    }
};

export const actualizarUsuario = async (userData) => {
    try {
        const formData = new FormData();
        Object.keys(userData).forEach(key => {
            formData.append(key, userData[key]);
        });

        const response = await fetch(`${API_BASE_URL}/administrador/usuarios/actualizar`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        throw error;
    }
};

export const eliminarUsuario = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/administrador/usuarios/eliminar/${id}`, {
            method: 'GET',
            ...fetchConfig
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error eliminando usuario:', error);
        throw error;
    }
};

// Gestión de compras
export const obtenerCompras = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/administrador/compras`, {
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
        const response = await fetch(`${API_BASE_URL}/administrador/detalle/${id}`, {
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

export const descargarFacturaAdmin = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/administrador/factura/${id}`, {
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