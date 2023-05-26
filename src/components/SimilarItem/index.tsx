import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Product } from '@types';
import { getNewPrice } from '@utils';

import './SimilarItem.scss';

type SimilarItemProps = {
  item: Product;
};

export const SimilarItem: FC<SimilarItemProps> = ({
  item: { id, previewImage, discount, title, overview, price },
}) => {
  const getPrice = () => {
    return getNewPrice(price.pcs, discount);
  };
  return (
    <li className="similar__item">
      <NavLink to={`/products/${id}`} className="similar__thumb">
        <img src={previewImage} alt={title} className="similar__image" />
        <div className="similar__discount">- {discount}%</div>
      </NavLink>
      <div className="similar__info">
        <h3 className="similar__name">
          <NavLink to={`/products/${id}`} className="similar__name-link">
            {title}
          </NavLink>
        </h3>
        <p className="similar__description">{overview.substring(0, 50)}...</p>
        <div className="similar__control">
          <div className="similar__price">
            <span>{getPrice()} USD</span>
            <span className="similar__price_old">{price.pcs} USD</span>
          </div>
          <button type="button" className="similar__button">
            Buy now
          </button>
        </div>
      </div>
    </li>
  );
};
