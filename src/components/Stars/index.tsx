import React, { FC } from 'react';

import { ReactComponent as Star } from '@assets/star.svg';

import './Stars.scss';

type StarsProps = {
  rating: number;
};

export const Stars: FC<StarsProps> = ({ rating }) => {
  return (
    <ul className="rating-list">
      {[...Array(rating)].map((_, index) => (
        <li key={index} className="rating-list__item">
          <Star className="rating-list__icon" />
        </li>
      ))}
      {rating < 5 &&
        [...Array(5 - rating)].map((_, index) => (
          <li key={index} className="rating-item">
            <Star className="rating-list__icon rating-list__icon_empty" />
          </li>
        ))}
    </ul>
  );
};
