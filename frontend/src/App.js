import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductosList from './components/ProductosList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
              <a className="navbar-brand" href="/">SIDATech</a>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<ProductosList />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;