import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { setRating } from '@store/filters/slice';
import { selectRating } from '@store/filters/selectors';
import { Stars } from '@components/Stars';
import { ReactComponent as Check } from '@assets/check.svg';

import './RatingFilter.scss';

export const RatingFilter: FC = () => {
  const dispatch = useAppDispatch();
  const selectedrating = useAppSelector(selectRating);

  const setRatinghandler = (rating: number) => {
    dispatch(setRating(rating));
  };

  const setCheckedRating = (productRating: number) =>
    selectedrating.some(element => element === productRating);

  return (
    <div className="filter">
      <h3 className="filter__title">Rating</h3>
      <ul className="filter__list rating__list">
        {[...Array(5)].map((_, index) => (
          <li key={index} className="filter__item rating__filter">
            <label htmlFor={`${index}`} className="filter__field">
              <input
                id={`${index}`}
                type="checkbox"
                checked={setCheckedRating(index + 1)}
                onChange={() => setRatinghandler(index + 1)}
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
