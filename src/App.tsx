import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SharedLayout from 'components/SharedLayout';
import HomePage from 'pages/HomePage';
import ProductsPage from 'pages/ProductsPage';
import ProductDetailsPage from 'pages/ProductDetailsPage';
import CheckoutPage from 'pages/CheckoutPage';
import NotFoundPage from 'pages/NotFoundPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<ProductDetailsPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
