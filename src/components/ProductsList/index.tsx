import React, { FC, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '@types';
import { useAppSelector } from '@hooks';
import { selectProducts, selectIsLoading } from '@store/products/selectors';
import { getFilteredProducts } from '@utils/getFilteredProducts';

import { ProductItem } from '@components/ProductItem';
import { Loader } from '@components/Loader';
import { Notification } from '@components/Notification';

import './ProductsList.scss';

export const ProductsList: FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectIsLoading);
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
    <>
      {isLoading ? (
        <Loader />
      ) : filteredProducts.length ? (
        <ul className="products-list">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} item={product} />
          ))}
        </ul>
      ) : (
        <Notification message="We are sorry, but there are no products." />
      )}
    </>
  );
};
