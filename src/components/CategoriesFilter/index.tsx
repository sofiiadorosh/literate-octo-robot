import React, { FC } from 'react';

import { CategoryCount } from '@types';

import './CategoriesFilter.scss';

type CategoriesFilterProps = {
  categories: CategoryCount;
};

export const CategoriesFilter: FC<CategoriesFilterProps> = ({ categories }) => {
  return (
    <div className="filter">
      <h3 className="filter__title">Categories</h3>
      <ul className="filter__list">
        {Object.keys(categories).map(element => (
          <li key={element} className="category-filter__item">
            <span>{element}</span>
            <span className="category-filter__number">
              {categories[element]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
