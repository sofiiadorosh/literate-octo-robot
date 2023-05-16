import React, { FC } from 'react';

import { Stars } from '@components/Stars';

import { ReactComponent as Check } from '@assets/check.svg';

import './RatingFilter.scss';

export const RatingFilter: FC = () => {
  return (
    <div className="filter">
      <h3 className="filter__title">Rating</h3>
      <ul className="filter__list rating-list">
        {[...Array(5)].map((_, index) => (
          <li key={`${index}_rtng`} className="filter__item rating-filter">
            <label htmlFor={`${index}_rtng`} className="filter__field">
              <input
                id={`${index}_rtng`}
                type="checkbox"
                className="filter__input"
              />
              <span className="filter__checkbox">
                <Check className="filter__icon" />
              </span>
              <Stars rating={index + 1} />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
