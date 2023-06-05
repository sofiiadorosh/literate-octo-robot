import React, { FC, useEffect } from 'react';

import { Container } from '@components/Container';
import { DefaultWish } from '@components/DefaultWish';
import { Loader } from '@components/Loader';
import { SimilarItem } from '@components/SimilarItem';
import { useAppSelector, useAppDispatch } from '@hooks';
import { getProductsByIds } from '@store/products/operations';
import {
  selectWishlistIds,
  selectIsLoading,
  selectWishlist,
} from '@store/products/selectors';

import './WishlistPage.scss';

const WishlistPage: FC = () => {
  const dispatch = useAppDispatch();
  const ids = useAppSelector(selectWishlistIds);
  const isLoading = useAppSelector(selectIsLoading);
  const items = useAppSelector(selectWishlist);

  useEffect(() => {
    dispatch(getProductsByIds(ids));
  }, [ids, dispatch]);

  return (
    <section className="wish">
      <Container>
        {isLoading ? (
          <Loader />
        ) : items.length ? (
          <ul className="wish__list">
            {items.map(item => (
              <SimilarItem key={item.id} item={item} page="wish" />
            ))}
          </ul>
        ) : (
          <DefaultWish />
        )}
      </Container>
    </section>
  );
};

export default WishlistPage;
