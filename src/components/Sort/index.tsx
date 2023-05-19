import React, { FC } from 'react';

import { SortingFilters } from '@types';
import { useAppSelector, useAppDispatch } from '@hooks';
import { setSort } from '@store/filters/slice';
import { selectSort } from '@store/filters/selectors';
import { ReactComponent as Arrow } from '@assets/arrow.svg';

import './Sort.scss';

export const Sort: FC = () => {
  const dispatch = useAppDispatch();
  const selectedSort = useAppSelector(selectSort);
  const options = Object.values(SortingFilters);

  const setSortHandler = (sort: SortingFilters) => {
    dispatch(setSort(sort));
  };

  return (
    <div className="sort">
      <div className="sort__title">Sort by</div>
      <div className="sort__line"></div>
      <div className="sort__options">
        <span>{selectedSort}</span>
        <Arrow className="sort__icon" />
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
      </div>
    </div>
  );
};
