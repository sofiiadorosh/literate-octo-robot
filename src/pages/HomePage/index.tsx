import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from '@components/Container';
import { Pathname } from '@types';

import './HomePage.scss';

const HomePage: FC = () => {
  return (
    <section className="home">
      <Container>
        <NavLink to={Pathname.PRODUCTS} className="home__link">
          All products
        </NavLink>
      </Container>
    </section>
  );
};

export default HomePage;
