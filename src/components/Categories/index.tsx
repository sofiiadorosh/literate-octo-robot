import React, { FC } from 'react';

import { DropDown } from '@components/DropDown';

import { categories } from '@constants';
import { ReactComponent as Arrow } from '@assets/arrow.svg';

import './Categories.scss';

export const Categories: FC = () => {
  return (
    <ul className="categories-list">
      {categories.map(category => (
        <li key={category} className="category-item">
          <span className="category-item__title">{category}</span>
          <Arrow className="category-item__icon" />
          <DropDown />
        </li>
      ))}
    </ul>
  );
};
