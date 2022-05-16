import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import AddProduct from './components/addProduct/AddProduct';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to="/products" />} />
        <Route path='/products' element={<Home />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/editProduct/:id' element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
