// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container, Grid, Card, CardMedia, Typography,
    TextField, Button, Box, Alert
} from '@mui/material';
import { productosService } from '../services/api';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await productosService.getById(id);
                setProducto(response.data);
            } catch (error) {
                setError('Error al cargar el producto');
            }
        };

        fetchProducto();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await productosService.addToCart({
                productoId: id,
                cantidad
            });
            navigate('/carrito');
        } catch (error) {
            setError('Error al agregar al carrito');
        }
    };

    if (!producto) return <Typography>Cargando...</Typography>;

    return (
        <Container sx={{ mt: 10 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="400"
                            image={`/images/${producto.imagen}`}
                            alt={producto.nombre}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        {producto.nombre}
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                        ${producto.precio}
                    </Typography>
                    <Box sx={{ my: 3 }}>
                        <TextField
                            type="number"
                            label="Cantidad"
                            value={cantidad}
                            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value)))}
                            InputProps={{ inputProps: { min: 1 } }}
                        />
                    </Box>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAddToCart}
                    >
                        Agregar al Carrito
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;