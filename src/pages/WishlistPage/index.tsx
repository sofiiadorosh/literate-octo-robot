import React, { FC, useEffect } from 'react';

import { Container } from '@components/Container';
import { DefaultWish } from '@components/DefaultWish';
import { Loader } from '@components/Loader';
import { SimilarItem } from '@components/SimilarItem';
import { useAppSelector, useAppDispatch } from '@hooks';
import { getProductsByIds } from '@store/wishlist/operations';
import {
  selectWishlistIds,
  selectWishlist,
  selectIsLoading,
} from '@store/wishlist/selectors';

import './WishlistPage.scss';

const WishlistPage: FC = () => {
  const dispatch = useAppDispatch();
  const ids = useAppSelector(selectWishlistIds);
  const items = useAppSelector(selectWishlist);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getProductsByIds(ids));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!items.length) {
    return <DefaultWish />;
  }

  return (
    <section className="wish">
      <Container>
        <ul className="wish__list">
          {items.map(item => (
            <SimilarItem key={item.id} item={item} page="wish" />
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default WishlistPage;
