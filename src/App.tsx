import React, { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from '@components/PrivateRoute';
import SharedLayout from '@components/SharedLayout';
import { useAppDispatch } from '@hooks';
import { getProducts } from '@store/products/operations';
import { Pathname } from '@types';
const HomePage = lazy(() => import('@pages/HomePage'));
const ProductsPage = lazy(() => import('@pages/ProductsPage'));
const ProductDetailsPage = lazy(() => import('@pages/ProductDetailsPage'));
const CheckoutPage = lazy(() => import('@pages/CheckoutPage'));
const WishlistPage = lazy(() => import('@pages/WishlistPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Routes>
      <Route path={Pathname.HOME} element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path={Pathname.PROFILE} element={<ProfilePage />} />
        <Route path={Pathname.PRODUCTS} element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route
          path={Pathname.CHECKOUT}
          element={
            <PrivateRoute
              redirectTo={Pathname.PROFILE}
              component={<CheckoutPage />}
            />
          }
        />
        <Route
          path={Pathname.WISHLIST}
          element={
            <PrivateRoute
              redirectTo={Pathname.PROFILE}
              component={<WishlistPage />}
            />
          }
        />
        <Route path={Pathname.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
