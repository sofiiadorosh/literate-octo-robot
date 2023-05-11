import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { getProducts } from '@store/products/operations';
import { selectProducts, selectIsLoading } from '@store/products/selectors';

import { ProductItem } from '@components/ProductItem';
import { Loader } from '@components/Loader';
import { Notification } from '@components/Notification';

import './ProductsList.scss';

export const ProductsList = () => {
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : products.length ? (
        <ul className="products-list">
          {products.map(product => (
            <ProductItem key={product.id} item={product} />
          ))}
        </ul>
      ) : (
        <Notification message="We are sorry, but there are no products." />
      )}
    </>
  );
};
