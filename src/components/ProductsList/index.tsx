import React, { FC } from 'react';

import { Product } from '@types';

import { ProductItem } from '@components/ProductItem';
import { Notification } from '@components/Notification';

import './ProductsList.scss';

type ProductListProps = {
  products: Product[];
};

export const ProductsList: FC<ProductListProps> = ({ products }) => {
  if (!products.length) {
    return <Notification message="We're sorry, but there are no products." />;
  }
  return (
    <ul className="products-list">
      {products.map(product => (
        <ProductItem key={product.id} item={product} />
      ))}
    </ul>
  );
};
