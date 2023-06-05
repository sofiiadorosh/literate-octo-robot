import React, { FC } from 'react';

import { OrderItem } from '@components/OrderItem';
import { useAppSelector } from '@hooks';
import { selectCartItems } from '@store/cart/selectors';

import './OrderList.scss';

export const OrderList: FC = () => {
  const items = useAppSelector(selectCartItems);

  return (
    <ul className="order__list">
      {items.map(item => (
        <OrderItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
