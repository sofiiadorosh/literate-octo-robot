import React, { FC } from 'react';

import { Container } from '@components/Container';
import { ProductsList } from '@components/ProductsList';

import './ProductsPage.scss';

const ProductsPage: FC = () => {
  return (
    <section className="products">
      <Container>
        <div className="products__title">
          <h1 className="products__heading">All Products</h1>
          <div className="products__quantity">
            <span className="products__quantity--number">117</span>
            <span>Products</span>
          </div>
        </div>
        <div className="products__content">
          <div>Sidebar</div>
          <ProductsList />
        </div>
      </Container>
    </section>
  );
};

export default ProductsPage;
