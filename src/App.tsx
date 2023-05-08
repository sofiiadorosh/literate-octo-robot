import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SharedLayout from 'components/SharedLayout';
import ProductsPage from 'pages/ProductsPage';
import ProductDetailsPage from 'pages/ProductDetailsPage';
import CheckoutPage from 'pages/CheckoutPage';
import ErrorPage from 'pages/NotFoundPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <SharedLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <ProductsPage /> },
        {
          path: 'products',
          element: <ProductsPage />,
        },
        {
          path: 'products/:productId',
          element: <ProductDetailsPage />,
        },
        {
          path: 'checkout',
          element: <CheckoutPage />,
        },
      ],
    },
  ],
  { basename: '/literate-octo-robot' }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
