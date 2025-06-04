// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import {
    Container, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Button, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { productosService } from '../services/api';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await productosService.getCart();
                setCartItems(response.data);
                calculateTotal(response.data);
            } catch (error) {
                console.error('Error al cargar el carrito:', error);
            }
        };

        fetchCart();
    }, []);

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) =>
            acc + (item.precio * item.cantidad), 0
        );
        setTotal(sum);
    };

    const handleRemoveItem = async (id) => {
        try {
            await productosService.removeFromCart(id);
            const updatedItems = cartItems.filter(item => item.id !== id);
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
        } catch (error) {
            console.error('Error al eliminar item:', error);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Carrito de Compras
            </Typography>

            {cartItems.length === 0 ? (
                <Typography>El carrito está vacío</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell align="right">Precio</TableCell>
                                    <TableCell align="right">Cantidad</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.nombre}</TableCell>
                                        <TableCell align="right">${item.precio}</TableCell>
                                        <TableCell align="right">{item.cantidad}</TableCell>
                                        <TableCell align="right">
                                            ${(item.precio * item.cantidad).toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() => handleRemoveItem(item.id)}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={3} align="right">
                                        <strong>Total:</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                        <strong>${total.toFixed(2)}</strong>
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleCheckout}
                        sx={{ mt: 3 }}
                    >
                        Proceder al Pago
                    </Button>
                </>
            )}
        </Container>
    );
};

export default Cart;