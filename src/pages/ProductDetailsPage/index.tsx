import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AboutProduct } from '@components/AboutProduct';
import { Container } from '@components/Container';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { SimilarList } from '@components/SimilarList';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getProductById } from '@store/productDetails/operations';
import { selectError, selectIsLoading } from '@store/productDetails/selectors';
import { selectProductsByCategory } from '@store/products/selectors';

import './ProductDetailsPage.scss';

const ProductDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);
  const products = useAppSelector(selectProductsByCategory);
  const { productId = '' } = useParams();

  useEffect(() => {
    dispatch(getProductById(productId));

    window.scrollTo(0, 0);
  }, [dispatch, productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    <Error message="Product was not found." />;
  }

  return (
    <>
      <section>
        <Container>
          <AboutProduct />
        </Container>
      </section>
      <section className="similar">
        <Container>
          <SimilarList items={products} />
        </Container>
      </section>
    </>
  );
};

export default ProductDetailsPage;
