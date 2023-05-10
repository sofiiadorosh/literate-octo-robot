import React, { FC } from 'react';

import { DropDown } from '@components/DropDown';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ReactComponent as Search } from '@assets/search.svg';

import './SearchBar.scss';

export const SearchBar: FC = () => {
  return (
    <div className="search-bar">
      <div className="search-bar__category">
        <span>All categories</span>
        <Arrow className="search-bar__icon" />
        <DropDown />
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
