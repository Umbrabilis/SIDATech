import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/productoService';

function ProductosList() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
            setLoading(false);
        } catch (error) {
            console.error('Error cargando productos:', error);
            setError('Error al cargar los productos');
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Productos</h2>
            <div className="row">
                {productos.map(producto => (
                    <div key={producto.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <p className="card-text">
                                    <strong>Precio:</strong> ${producto.precio}
                                </p>
                                <p className="card-text">
                                    <strong>Stock:</strong> {producto.stock}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductosList;