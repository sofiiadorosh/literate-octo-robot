import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import { useAppSelector } from '@hooks';
import { selectProducts } from '@store/products/selectors';
import { getCategories } from '@services';

import { DropDown } from '@components/DropDown';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ReactComponent as Search } from '@assets/search.svg';

import './SearchBar.scss';

type Params = {
  category?: string;
  query?: string;
};

export const SearchBar: FC = () => {
  const products = useAppSelector(selectProducts);
  const categories = getCategories(products);
  const dropdownCategories = ['All categories', ...categories];
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('query');
  const [query, setQuery] = useState<string>(queryParam ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam
      ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
      : 'All categories'
  );

  useEffect(() => {
    const params: Params = {};
    if (selectedCategory !== 'All categories') {
      params.category = selectedCategory.toLowerCase();
    }
    if (query) {
      params.query = query.toLowerCase();
    }
    setSearchParams(params);
  }, [selectedCategory, query]);

  const queryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setQuery(value);
  };

  const clearInputHandler: React.MouseEventHandler<HTMLButtonElement> = () =>
    setQuery('');

  return (
    <div className="search-bar">
      <div className="search-bar__category">
        <span>{selectedCategory}</span>
        <Arrow className="search-bar__icon" />
        <DropDown
          items={dropdownCategories}
          onChooseOption={setSelectedCategory}
        />
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
            value={query}
            onChange={queryChangeHandler}
            placeholder="Search Products, categories ..."
            className="search-form__input"
          />
        </div>
        <button
          type="button"
          className="search-button"
          onClick={clearInputHandler}
        >
          {query.length ? (
            <IoClose size={20} />
          ) : (
            <Search className="search-button__icon" />
          )}
        </button>
      </form>
    </div>
  );
};
