import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@hooks';
import { getProductById } from '@store/products/operations';

const ProductDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [productId]);

  return <div>Product Details</div>;
};

export default ProductDetailsPage;
