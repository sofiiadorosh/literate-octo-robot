import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import space from '@assets/space.png';

import './DefaultWish.scss';

export const DefaultWish: FC = () => {
  return (
    <div className="default-wish">
      <img src={space} alt="Space" width="320" />
      <h1 className="default-wish__title">
        There&apos;s so much space in here!
      </h1>
      <p className="default-wish__description">
        Unleash your curiosity and embark on a delightful journey of product
        exploration. Discover captivating categories and brands that will
        enchant your senses and bring joy to your life. Start exploring and find
        your perfect match among a treasure trove of delightful products.
      </p>
      <NavLink to="/products" className="default-wish__link">
        Explore products
      </NavLink>
    </div>
  );
};
