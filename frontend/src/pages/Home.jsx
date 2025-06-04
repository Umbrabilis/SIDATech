// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, Button, Typography, Container } from '@mui/material';
import axios from 'axios';

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Ajusta la URL según tu backend
                const response = await axios.get('http://localhost:8080/api/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    if (loading) {
        return <Typography>Cargando productos...</Typography>;
    }

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Bienvenido a SidaTech Shop
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom color="textSecondary">
                Tecnología que transforma tu mundo
            </Typography>

            <Grid container spacing={4} sx={{ mt: 4 }}>
                {productos.map((producto) => (
                    <Grid item key={producto.id} xs={12} sm={6} md={3}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`/images/${producto.imagen}`}
                                alt={producto.nombre}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    {producto.nombre}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ${producto.precio}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    component={Link}
                                    to={`/producto/${producto.id}`}
                                >
                                    Ver Producto
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;