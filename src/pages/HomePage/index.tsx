import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from '@components/Container';

import './HomePage.scss';

const HomePage: FC = () => {
  return (
    <section className="home">
      <Container>
        <NavLink to="/products" className="home__link">
          All products
        </NavLink>
      </Container>
    </section>
  );
};

export default HomePage;
