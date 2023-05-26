import React, { FC } from 'react';

import { Notification } from '@components/Notification';
import { Stars } from '@components/Stars';
import { Review } from '@types';

import './Reviews.scss';

type ReviewsProps = {
  items: Review[];
};

export const Reviews: FC<ReviewsProps> = ({ items }) => {
  if (!items.length) {
    return <Notification message="There is no reviews." />;
  }
  return (
    <ul className="review__list">
      {items.map(({ user, rating, title, review }, index) => (
        <li key={index} className="review__item">
          <p className="review__user">{user}</p>
          <Stars rating={rating} />
          <p className="review__title">{title}</p>
          <p className="review__text">{review}</p>
        </li>
      ))}
    </ul>
  );
};
