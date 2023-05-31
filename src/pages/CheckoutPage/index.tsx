import React, { FC } from 'react';

import { CheckoutForm } from '@components/CheckoutForm';
import { CompletedOrder } from '@components/CompletedOrder';
import { Container } from '@components/Container';
import { Order } from '@components/Order';
import { useAppSelector } from '@hooks';
import { selectIsFormSubmitted } from '@store/cart/selectors';

import './CheckoutPage.scss';

const CheckoutPage: FC = () => {
  const isFormSubmitted = useAppSelector(selectIsFormSubmitted);
  return (
    <section className="checkout">
      <Container>
        {isFormSubmitted ? (
          <CompletedOrder />
        ) : (
          <div className="checkout__layout">
            <CheckoutForm />
            <Order />
          </div>
        )}
      </Container>
    </section>
  );
};

export default CheckoutPage;
