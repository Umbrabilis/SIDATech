import React, { useState, useEffect } from 'react';
import { obtenerProductos, eliminarProducto } from '../../services/productoService';
import ProductoForm from './ProductoForm';

function ProductosList() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

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

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await eliminarProducto(id);
                cargarProductos();
            } catch (error) {
                console.error('Error eliminando producto:', error);
            }
        }
    };

    const handleEditar = (producto) => {
        setProductoEditando(producto);
        setMostrarForm(true);
    };

    const handleGuardar = () => {
        setMostrarForm(false);
        setProductoEditando(null);
        cargarProductos();
    };

    const handleCancelar = () => {
        setMostrarForm(false);
        setProductoEditando(null);
    };

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Productos</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setMostrarForm(true)}
                >
                    Agregar Producto
                </button>
            </div>

            {mostrarForm && (
                <div className="mb-4">
                    <ProductoForm
                        producto={productoEditando}
                        onSave={handleGuardar}
                        onCancel={handleCancelar}
                    />
                </div>
            )}

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
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => handleEditar(producto)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleEliminar(producto.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductosList;