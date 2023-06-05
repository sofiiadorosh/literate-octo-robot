import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Cart } from '@assets/empty-cart.svg';

import './DefaultCart.scss';

export const DefaultCart: FC = () => {
  return (
    <div className="empty-cart">
      <h2 className="empty-cart__title">Your cart is empty</h2>
      <Cart className="empty-cart__image" />
      <p className="empty-cart__action">
        Time to&nbsp;
        <NavLink to="/products" className="empty-cart__link">
          start
        </NavLink>
        &nbsp;shopping!
      </p>
      <p className="empty-cart__description">
        The price and availability of items at Freshnesecom are subject to
        change.
      </p>
      <p className="empty-cart__description">
        The Cart is a temporary place to store a list of your items and reflects
        each item&apos;s most recent price.
      </p>
      <p className="empty-cart__description">
        Do you have a promotional code? We&apos;ll ask you to enter your promo
        code when it&apos;s time to pay.
      </p>
    </div>
  );
};
