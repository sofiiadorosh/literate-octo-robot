import React, { FC } from 'react';

import { CompletedOrder } from '@components/CompletedOrder';
import { Container } from '@components/Container';

const OrderConfirmation: FC = () => {
  return (
    <section>
      <Container>
        <CompletedOrder />
      </Container>
    </section>
  );
};

export default OrderConfirmation;
