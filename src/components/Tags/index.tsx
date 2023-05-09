import React, { FC } from 'react';

import './Tags.scss';

const tagItems = [
  'Beans',
  'Carrots',
  'Apples',
  'Garlic',
  'Mushrooms',
  'Tomatoes',
  'Chili peppers',
  'Broccoli',
  'Watermelons',
  'Oranges',
  'Bananas',
  'Grapes',
  'Cherries',
  'Meat',
  'Seo tag',
  'Fish',
  'Fresh food',
  'Lemons',
];

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
