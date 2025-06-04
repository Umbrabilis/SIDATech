// src/pages/OrderComplete.jsx
import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const OrderComplete = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main' }} />
                <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                    ¡Orden Completada!
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Tu pedido ha sido procesado exitosamente.
                    Recibirás un correo electrónico con los detalles de tu compra.
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/')}
                        sx={{ mr: 2 }}
                    >
                        Volver al inicio
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/mis-ordenes')}
                    >
                        Ver mis órdenes
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default OrderComplete;