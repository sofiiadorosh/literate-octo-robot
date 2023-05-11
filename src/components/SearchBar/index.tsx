import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@hooks';
import { selectProducts } from '@store/products/selectors';
import { getCategories } from '@services';

import { DropDown } from '@components/DropDown';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ReactComponent as Search } from '@assets/search.svg';

import './SearchBar.scss';

export const SearchBar: FC = () => {
  const products = useAppSelector(selectProducts);
  const categories = getCategories(products);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || 'All categories'
  );

  useEffect(() => {
    if (selectedCategory === 'All categories') return;
    setSearchParams({ category: selectedCategory.toLowerCase() });
  }, [selectedCategory]);

  return (
    <div className="search-bar">
      <div className="search-bar__category">
        <span>
          {selectedCategory.length > 14
            ? selectedCategory.substring(0, 14) + '...'
            : selectedCategory}
        </span>
        <Arrow className="search-bar__icon" />
        <DropDown items={categories} onChooseOption={setSelectedCategory} />
      </div>
      <div className="search-bar__line"></div>
      <form autoComplete="off" className="search-form">
        <div className="search-form__field">
          <label htmlFor="query" className="search-form__label">
            Search Products, categories ...
          </label>
          <input
            id="query"
            type="text"
            placeholder="Search Products, categories ..."
            className="search-form__input"
          />
        </div>
        <button className="search-button">
          <Search className="search-button__icon" />
        </button>
      </form>
    </div>
  );
};
