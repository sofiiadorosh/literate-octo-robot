import React, { FC } from 'react';

import { tagItems } from '@constants';

import './Tags.scss';

export const Tags: FC = () => {
  return (
    <div className="footer-tag">
      <p className="footer-tag__title">Product tags</p>
      <ul className="footer-tag__list">
        {tagItems.map(item => (
          <li key={item} className="footer-tag__item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
