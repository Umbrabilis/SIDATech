import React, { useState } from 'react';
import { crearProducto, actualizarProducto } from '../../services/productoService';

function ProductoForm({ producto = null, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        nombre: producto?.nombre || '',
        descripcion: producto?.descripcion || '',
        precio: producto?.precio || '',
        stock: producto?.stock || '',
        imagen: producto?.imagen || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (producto) {
                await actualizarProducto(producto.id, formData);
            } else {
                await crearProducto(formData);
            }
            onSave();
        } catch (error) {
            console.error('Error guardando producto:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imagen: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    {producto ? 'Editar Producto' : 'Nuevo Producto'}
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input
                            type="number"
                            className="form-control"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Imagen</label>
                        <input
                            type="file"
                            className="form-control"
                            name="imagen"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">
                        Guardar
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductoForm;