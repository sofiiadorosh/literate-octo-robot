import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks';
import { getProductById } from '@store/products/operations';
import { selectError } from '@store/products/selectors';

const ProductDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [productId]);

  if (error) {
    return <p>Product was not found</p>;
  }

  return <div>Product Details</div>;
};

export default ProductDetailsPage;
