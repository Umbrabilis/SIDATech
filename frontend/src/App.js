import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductosList from './components/ProductosList';
import ProductoDetalle from './components/ProductoDetalle';
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container">
                        <Link className="navbar-brand" to="/">SIDATech</Link>
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/">Productos</Link>
                        </div>
                    </div>
                </nav>

                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<ProductosList />} />
                        <Route path="/producto/:id" element={<ProductoDetalle />} />
                    </Routes>
                </ErrorBoundary>
            </div>
        </Router>
    );
}

export default App;