import React, { FC } from 'react';

import { useAppSelector } from '@hooks';
import { selectProducts } from '@store/products/selectors';

import { Container } from '@components/Container';
import { ProductsList } from '@components/ProductsList';

import './ProductsPage.scss';

const ProductsPage: FC = () => {
  const products = useAppSelector(selectProducts).length;
  return (
    <section className="products">
      <Container>
        <div className="products__title">
          <h1 className="products__heading">All Products</h1>
          <div className="products__quantity">
            <span className="products__quantity--number">{products}</span>
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
