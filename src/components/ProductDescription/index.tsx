import React, { FC } from 'react';

import { Description } from '@types';

import './ProductDescription.scss';

type ProductDescriptionProps = {
  items: Description[];
};

export const ProductDescription: FC<ProductDescriptionProps> = ({ items }) => {
  return (
    <ul className="description__list">
      {items.map(({ name, details }, index) => (
        <li key={index} className="description__item">
          <h2 className="description__title">{name}</h2>
          <p>{details}</p>
        </li>
      ))}
    </ul>
  );
};
