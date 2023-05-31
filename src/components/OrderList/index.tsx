import React, { FC } from 'react';

import { OrderItem } from '@components/OrderItem';
import { useAppSelector } from '@hooks';
import { selectOrder } from '@store/cart/selectors';

import './OrderList.scss';

export const OrderList: FC = () => {
  const items = useAppSelector(selectOrder);

  return (
    <ul className="order__list">
      {items.map(item => (
        <OrderItem key={item.product.id} item={item} />
      ))}
    </ul>
  );
};
