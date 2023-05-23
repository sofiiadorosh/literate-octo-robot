import React, { FC } from 'react';

import { useAppSelector, useAppDispatch } from '@hooks';
import { selectCategory } from '@store/filters/selectors';
import { setCategory } from '@store/filters/slice';
import { selectProducts } from '@store/products/selectors';
import { CategoryCount } from '@types';

import './CategoriesFilter.scss';

type CategoriesFilterProps = {
  categories: CategoryCount;
};

export const CategoriesFilter: FC<CategoriesFilterProps> = ({ categories }) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectCategory);
  const products = useAppSelector(selectProducts);

  const setCategoryHandler = (category: string) => {
    dispatch(setCategory(category));
  };

  return (
    <div className="filter">
      <h3 className="filter__title">Categories</h3>
      <ul className="filter__list">
        <li
          className={
            'All categories' === selectedCategory
              ? 'category-filter__item category-filter__item_active'
              : 'category-filter__item'
          }
          onClick={() => setCategoryHandler('All categories')}
        >
          <span>All categories</span>
          <span className="category-filter__number">{products.length}</span>
        </li>
        {Object.keys(categories).map(element => (
          <li
            key={element}
            className={
              element === selectedCategory
                ? 'category-filter__item category-filter__item_active'
                : 'category-filter__item'
            }
            onClick={() => setCategoryHandler(element)}
          >
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
