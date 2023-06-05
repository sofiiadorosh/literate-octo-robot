import React, { FC, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ReactComponent as Search } from '@assets/search.svg';
import { DropDown } from '@components/DropDown';
import { useAppSelector, useAppDispatch } from '@hooks';
import { getCategories } from '@services';
import { selectCategory, selectQuery } from '@store/filters/selectors';
import { setCategory, setQuery } from '@store/filters/slice';
import { selectProducts } from '@store/products/selectors';

import './SearchBar.scss';

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const selectedCategory = useAppSelector(selectCategory);
  const typedQuery = useAppSelector(selectQuery);

  const categories = getCategories(products);
  const dropdownCategories = ['All categories', ...Object.keys(categories)];

  const [menuOpen, setMenuOpen] = useState(false);

  const queryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    dispatch(setQuery(value));
  };

  const clearInputHandler: React.MouseEventHandler<HTMLButtonElement> = () =>
    dispatch(setQuery(''));

  const chooseOptionHandler = (name: string) => {
    dispatch(setCategory(name));
    closeMenuHandler();
  };

  const openMenuHandler = () => {
    setMenuOpen(true);
  };

  const closeMenuHandler = () => {
    setMenuOpen(false);
  };

  return (
    <div className="search-bar">
      <div
        className="search-bar__category"
        onMouseOver={openMenuHandler}
        onMouseLeave={closeMenuHandler}
      >
        <span>{selectedCategory}</span>
        <Arrow className="search-bar__icon" />
        {menuOpen && (
          <DropDown
            items={dropdownCategories}
            onChooseOption={chooseOptionHandler}
          />
        )}
      </div>
      <div className="search-bar__line"></div>
      <form autoComplete="off" className="search-bar__form">
        <div className="search-bar__field">
          <label htmlFor="query" className="search-bar__label">
            Search products...
          </label>
          <input
            id="query"
            type="text"
            value={typedQuery ?? ''}
            onChange={queryChangeHandler}
            placeholder="Search products..."
            className="search-bar__input"
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
