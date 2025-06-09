import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerProducto } from '../services/productoService';

function ProductoDetalle() {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                const data = await obtenerProducto(id);
                setProducto(data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        cargarProducto();
    }, [id]);

    if (loading) return <div className="text-center mt-4">Cargando...</div>;
    if (!producto) return <div className="text-center mt-4">Producto no encontrado</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{producto.nombre}</h3>
                    <p className="card-text">{producto.descripcion}</p>
                    <p className="card-text">
                        <strong>Precio:</strong> ${producto.precio}
                    </p>
                    <p className="card-text">
                        <strong>Stock:</strong> {producto.stock}
                    </p>
                    {producto.imagen && (
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-fluid mb-3"
                        />
                    )}
                    <div>
                        <button
                            className="btn btn-primary me-2"
                            onClick={() => navigate('/')}
                        >
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductoDetalle;