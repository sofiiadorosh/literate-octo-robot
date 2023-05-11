import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '@types';
import { useAppSelector } from '@hooks';
import { selectProducts, selectIsLoading } from '@store/products/selectors';
import { getProductsByCategory } from '@services';

import { ProductItem } from '@components/ProductItem';
import { Loader } from '@components/Loader';
import { Notification } from '@components/Notification';

import './ProductsList.scss';

export const ProductsList: FC = () => {
  const allProducts = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    if (!categoryParam) {
      setProducts(allProducts);
    } else {
      const products = getProductsByCategory(allProducts, categoryParam);
      setProducts(products);
    }
  }, [categoryParam]);

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
