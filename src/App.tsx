import React, { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import SharedLayout from '@components/SharedLayout';
import { useAppDispatch } from '@hooks';
import { getProducts } from '@store/products/operations';
const HomePage = lazy(() => import('@pages/HomePage'));
const ProductsPage = lazy(() => import('@pages/ProductsPage'));
const ProductDetailsPage = lazy(() => import('@pages/ProductDetailsPage'));
const CheckoutPage = lazy(() => import('@pages/CheckoutPage'));
const WishlistPage = lazy(() => import('@pages/WishlistPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
