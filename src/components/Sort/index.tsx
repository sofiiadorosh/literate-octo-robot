import React, { FC, useState } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { useAppSelector, useAppDispatch } from '@hooks';
import { selectSort } from '@store/filters/selectors';
import { setSort } from '@store/filters/slice';
import { SortingFilters } from '@types';

import './Sort.scss';

export const Sort: FC = () => {
  const dispatch = useAppDispatch();
  const selectedSort = useAppSelector(selectSort);
  const options = Object.values(SortingFilters);

  const [menuOpen, setMenuOpen] = useState(false);

  const setSortHandler = (sort: SortingFilters) => {
    dispatch(setSort(sort));
    setMenuOpen(false);
  };

  const openMenuHandler = () => {
    setMenuOpen(true);
  };

  const closeMenuHandler = () => {
    setMenuOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__title">Sort by</div>
      <div className="sort__line"></div>
      <div
        className="sort__options"
        onMouseOver={openMenuHandler}
        onMouseLeave={closeMenuHandler}
      >
        <span>{selectedSort}</span>
        <Arrow className="sort__icon" />
        {menuOpen && (
          <div className="dropdown">
            <ul className="dropdown__list">
              {options.map(option => (
                <li
                  key={option}
                  className="dropdown__item"
                  onClick={() => setSortHandler(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
