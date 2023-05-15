import React, { FC } from 'react';

import { useAppSelector } from '@hooks';
import { selectProducts } from '@store/products/selectors';

import { getCategories } from '@services';

// import { DropDown } from '@components/DropDown';

import { ReactComponent as Arrow } from '@assets/arrow.svg';

import './Categories.scss';

export const Categories: FC = () => {
  const products = useAppSelector(selectProducts);
  const categories = Object.keys(getCategories(products));

  return (
    <ul className="categories-list">
      {categories.map(category => (
        <li key={category} className="category-item">
          <span className="category-item__title">{category}</span>
          <Arrow className="category-item__icon" />
          {/* <DropDown /> */}
        </li>
      ))}
    </ul>
  );
};
