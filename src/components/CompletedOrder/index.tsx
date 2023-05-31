import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from '@hooks';
import { setFormSubmitted } from '@store/cart/slice';

import './CompletedOrder.scss';

export const CompletedOrder: FC = () => {
  const dispatch = useAppDispatch();
  const setFormSubmittedHandler = () => {
    dispatch(setFormSubmitted(false));
  };
  return (
    <div className="order-confirm">
      <h1 className="order-confirm__title">
        Your order is complete! Thank you!
      </h1>
      <p className="order-confirm__description">
        We&apos;re getting started on your order right away, and you will
        receive an order confirmation email. In the meantime, explore the latest
        products, just head over to
      </p>
      <NavLink
        to="/products"
        className="order-confirm__link"
        onClick={setFormSubmittedHandler}
      >
        Explore more products
      </NavLink>
    </div>
  );
};
