import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from '@components/Container';

const HomePage: FC = () => {
  return (
    <div>
      <Container>
        <NavLink to="/products" style={{ fontSize: 20 }}>
          Link to Products Page
        </NavLink>
      </Container>
    </div>
  );
};

export default HomePage;
