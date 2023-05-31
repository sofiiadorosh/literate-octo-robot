import React, { FC } from 'react';

import { CheckoutForm } from '@components/CheckoutForm';
import { Container } from '@components/Container';
import { Order } from '@components/Order';

import './CheckoutPage.scss';

const CheckoutPage: FC = () => {
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
