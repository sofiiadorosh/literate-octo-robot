import React, { FC } from 'react';
import { IoClose } from 'react-icons/io5';

import { useAppSelector, useAppDispatch } from '@hooks';
import { selectProducts } from '@store/products/selectors';
import { selectCategory, selectQuery } from '@store/filters/selectors';
import { setCategory, setQuery } from '@store/filters/slice';
import { getCategories } from '@services';

import { DropDown } from '@components/DropDown';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ReactComponent as Search } from '@assets/search.svg';

import './SearchBar.scss';

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = getCategories(products);
  const dropdownCategories = ['All categories', ...Object.keys(categories)];
  const selectedCategory = useAppSelector(selectCategory);
  const typedQuery = useAppSelector(selectQuery);

  const queryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    dispatch(setQuery(value));
  };

  const clearInputHandler: React.MouseEventHandler<HTMLButtonElement> = () =>
    dispatch(setQuery(''));

  const chooseOptionHandler = (name: string) => {
    dispatch(setCategory(name));
  };
  return (
    <div className="search-bar">
      <div className="search-bar__category">
        <span>{selectedCategory}</span>
        <Arrow className="search-bar__icon" />
        <DropDown
          items={dropdownCategories}
          onChooseOption={chooseOptionHandler}
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
            value={typedQuery ?? ''}
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
          {typedQuery?.length ? (
            <IoClose size={20} />
          ) : (
            <Search className="search-button__icon" />
          )}
        </button>
      </form>
    </div>
  );
};
