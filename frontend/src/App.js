// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            {/* Rutas Protegidas */}
            <Route
                path="/carrito"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
            />

            {/* Rutas de Administrador */}
            <Route
                path="/admin/*"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
            />
          </Routes>
        </Router>
      </ThemeProvider>
  );
}

export default App;