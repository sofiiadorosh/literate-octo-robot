import React, { FC } from 'react';

import { DefaultWish } from '@components/DefaultWish';
import { Loader } from '@components/Loader';
import { SimilarItem } from '@components/SimilarItem';
import { useAppSelector } from '@hooks';
import { selectWishlist, selectIsLoading } from '@store/wishlist/selectors';

export const Wishlist: FC = () => {
  const items = useAppSelector(selectWishlist);
  const isLoading = useAppSelector(selectIsLoading);

  if (isLoading) {
    return <Loader />;
  }

  if (!items.length) {
    return <DefaultWish />;
  }

  return (
    <ul className="wish__list">
      {items.map(item => (
        <SimilarItem key={item.id} item={item} page="wish" />
      ))}
    </ul>
  );
};
