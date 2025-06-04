// src/pages/Checkout.jsx
import React, { useState } from 'react';
import {
    Container,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Button,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { productosService } from '../services/api';

const steps = ['Confirmar productos', 'Detalles de envío', 'Método de pago'];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleFinishOrder = async () => {
        try {
            await productosService.createOrder();
            navigate('/orden-completada');
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 10 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Checkout
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 4 }}>
                    {activeStep === steps.length ? (
                        <>
                            <Typography gutterBottom>
                                ¡Gracias por tu compra!
                            </Typography>
                            <Button
                                onClick={() => navigate('/')}
                                variant="contained"
                            >
                                Volver al inicio
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* Aquí irían los componentes para cada paso */}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mr: 1 }}>
                                        Atrás
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={activeStep === steps.length - 1 ? handleFinishOrder : handleNext}
                                >
                                    {activeStep === steps.length - 1 ? 'Finalizar compra' : 'Siguiente'}
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default Checkout;