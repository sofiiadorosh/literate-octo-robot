import React, { FC } from 'react';

import { CheckoutForm } from '@components/CheckoutForm';
import { Container } from '@components/Container';

import './CheckoutPage.scss';

const CheckoutPage: FC = () => {
  return (
    <section className="checkout">
      <Container>
        <div className="checkout__layout">
          <CheckoutForm />
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
