import React, { FC } from 'react';

import './CategoriesFilter.scss';

export const CategoriesFilter: FC = () => {
  return (
    <div className="filter">
      <h3 className="filter__title">Categories</h3>
      <ul className="filter__list">
        <li className="category-filter__item">
          <span>Category name</span>
          <span className="category-filter__number">173</span>
        </li>
        <li className="category-filter__item">
          <span>Category name</span>
          <span className="category-filter__number">173</span>
        </li>
        <li className="category-filter__item">
          <span>Category name</span>
          <span className="category-filter__number">173</span>
        </li>
        <li className="category-filter__item">
          <span>Category name</span>
          <span className="category-filter__number">173</span>
        </li>
      </ul>
    </div>
  );
};
