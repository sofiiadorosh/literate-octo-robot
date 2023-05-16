import React, { FC } from 'react';

import { Product } from '@types';

import { ProductItem } from '@components/ProductItem';

import './ProductsList.scss';

type ProductListProps = {
  products: Product[];
};

export const ProductsList: FC<ProductListProps> = ({ products }) => {
  return (
    <ul className="products-list">
      {products.map(product => (
        <ProductItem key={product.id} item={product} />
      ))}
    </ul>
  );
};
