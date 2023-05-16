import React, { FC } from 'react';

import { ReactComponent as Star } from '@assets/star.svg';

import './Stars.scss';

type StarsProps = {
  rating: number;
};

export const Stars: FC<StarsProps> = ({ rating }) => {
  return (
    <ul className="product-info__rating">
      {[...Array(rating)].map((_, index) => (
        <li key={index} className="rating-item">
          <Star className="rating-item__icon--filled" />
        </li>
      ))}
      {rating < 5 &&
        [...Array(5 - rating)].map((_, index) => (
          <li key={index} className="rating-item">
            <Star className="rating-item__icon--empty" />
          </li>
        ))}
    </ul>
  );
};
