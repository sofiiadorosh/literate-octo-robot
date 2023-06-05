import React, { FC, useEffect } from 'react';

import { Container } from '@components/Container';
import { Wishlist } from '@components/Wishlist';
import { useAppSelector, useAppDispatch } from '@hooks';
import { getProductsByIds } from '@store/wishlist/operations';
import { selectWishlistIds } from '@store/wishlist/selectors';

import './WishlistPage.scss';

const WishlistPage: FC = () => {
  const dispatch = useAppDispatch();
  const ids = useAppSelector(selectWishlistIds);

  useEffect(() => {
    dispatch(getProductsByIds(ids));
  }, [ids, dispatch]);

  return (
    <section className="wish">
      <Container>
        <Wishlist />
      </Container>
    </section>
  );
};

export default WishlistPage;
