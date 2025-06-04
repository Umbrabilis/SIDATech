// src/components/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);

    return (
        <AppBar position="fixed">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
                        SidaTech Shop
                    </Typography>

                    <div>
                        {!isLoggedIn ? (
                            <>
                                <Button color="inherit" component={Link} to="/login">
                                    Iniciar Sesión
                                </Button>
                                <Button color="inherit" component={Link} to="/registro">
                                    Registro
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" component={Link} to="/carrito">
                                    Carrito
                                </Button>
                                {isAdmin && (
                                    <Button color="inherit" component={Link} to="/admin">
                                        Admin
                                    </Button>
                                )}
                                <Button color="inherit" onClick={() => setIsLoggedIn(false)}>
                                    Cerrar Sesión
                                </Button>
                            </>
                        )}
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navigation;