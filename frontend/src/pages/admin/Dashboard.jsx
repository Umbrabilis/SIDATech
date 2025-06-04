// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { productosService } from '../../services/api';

const Dashboard = () => {
    const [productos, setProductos] = useState([]);
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productosRes, ordenesRes] = await Promise.all([
                    productosService.getAll(),
                    productosService.getOrdenes()
                ]);
                setProductos(productosRes.data);
                setOrdenes(ordenesRes.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteProduct = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await productosService.delete(id);
                setProductos(productos.filter(p => p.id !== id));
            } catch (error) {
                console.error('Error al eliminar producto:', error);
            }
        }
    };

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Panel de Administración
            </Typography>

            <Grid container spacing={4}>
                {/* Sección de Productos */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Productos
                                <Button
                                    component={Link}
                                    to="/admin/productos/nuevo"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{ float: 'right' }}
                                >
                                    Nuevo Producto
                                </Button>
                            </Typography>
                            <List>
                                {productos.map((producto) => (
                                    <ListItem key={producto.id}>
                                        <ListItemText
                                            primary={producto.nombre}
                                            secondary={`$${producto.precio}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                component={Link}
                                                to={`/admin/productos/editar/${producto.id}`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleDeleteProduct(producto.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sección de Órdenes */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Últimas Órdenes
                            </Typography>
                            <List>
                                {ordenes.map((orden) => (
                                    <ListItem key={orden.id}>
                                        <ListItemText
                                            primary={`Orden #${orden.numero}`}
                                            secondary={`Total: $${orden.total}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button
                                                component={Link}
                                                to={`/admin/ordenes/${orden.id}`}
                                                size="small"
                                            >
                                                Ver Detalles
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;