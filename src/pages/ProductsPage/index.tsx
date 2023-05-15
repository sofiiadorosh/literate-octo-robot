import React, { FC, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '@types';

import { getFilteredProducts } from '@utils/getFilteredProducts';

import { useAppSelector } from '@hooks';
import { selectProducts, selectIsLoading } from '@store/products/selectors';

import { Container } from '@components/Container';
import { ProductsList } from '@components/ProductsList';
import { Loader } from '@components/Loader';

import './ProductsPage.scss';

const ProductsPage: FC = () => {
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
  const [searchParams] = useSearchParams();
  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );
  const { category, query } = params;

  useEffect(() => {
    const allProducts = getFilteredProducts({ category, query, products });
    setFilteredProducts(allProducts);
  }, [category, query, products]);

  return (
    <section className="products">
      <Container>
        <div className="products__title">
          <h1 className="products__heading">All Products</h1>
          <div className="products__quantity">
            <span className="products__quantity--number">
              {filteredProducts.length}
            </span>
            <span>Products</span>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="products__content">
            <div>Sidebar</div>
            <ProductsList products={filteredProducts} />
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductsPage;
