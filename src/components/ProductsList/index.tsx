import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { getProducts } from '@store/products/operations';
import { selectProducts } from '@store/products/selectors';

import { ProductItem } from '@components/ProductItem';

import './ProductsList.scss';

export const ProductsList = () => {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <ul className="products-list">
      {products.map(product => (
        <ProductItem key={product.id} item={product} />
      ))}
    </ul>
  );
};
