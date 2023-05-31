import React, { FC, useEffect } from 'react';

import { CheckoutForm } from '@components/CheckoutForm';
import { Container } from '@components/Container';
import { Order } from '@components/Order';
import { useAppSelector, useAppDispatch } from '@hooks';
import { getProductsByIds } from '@store/cart/operations';
import { selectCart } from '@store/cart/selectors';

import './CheckoutPage.scss';

const CheckoutPage: FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  useEffect(() => {
    const ids = cart.map(item => item.id);
    dispatch(getProductsByIds(ids));
  }, [cart, dispatch]);

  return (
    <section className="checkout">
      <Container>
        <div className="checkout__layout">
          <CheckoutForm />
          <Order />
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
