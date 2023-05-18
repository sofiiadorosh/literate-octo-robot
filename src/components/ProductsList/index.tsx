import React, { forwardRef } from 'react';

import { Product } from '@types';

import { ProductItem } from '@components/ProductItem';

import './ProductsList.scss';

type ProductsListProps = {
  products: Product[];
};

export const ProductsList = forwardRef<HTMLUListElement, ProductsListProps>(
  function ProductsList({ products }, ref) {
    return (
      <ul className="products-list" ref={ref}>
        {products.map(product => (
          <ProductItem key={product.id} item={product} />
        ))}
      </ul>
    );
  }
);
