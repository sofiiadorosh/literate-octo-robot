import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Heart } from '@assets/heart.svg';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectWishlistIds } from '@store/products/selectors';
import { setWishlist } from '@store/products/slice';
import { Product } from '@types';
import { getNewPrice } from '@utils';

import './SimilarItem.scss';

type SimilarItemProps = {
  item: Product;
  page?: string;
};

export const SimilarItem: FC<SimilarItemProps> = ({
  item: { id, previewImage, discount, title, overview, price },
  page,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistIds);

  const isProductInWishlist = items.some(item => item === id);

  const updateWishlistHandler = () => {
    dispatch(setWishlist(id));
  };

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
            {title.length > 28 ? `${title.substring(0, 28)}...` : title}
          </NavLink>
        </h3>
        <p className="similar__description">{overview.substring(0, 50)}...</p>
        <div className="similar__control">
          <div className="similar__price">
            <span>{getPrice()} USD</span>
            <span className="similar__price_old">{price.pcs} USD</span>
          </div>
          <div className="similar__button-wrapper">
            <NavLink to={`/products/${id}`} className="similar__button">
              Buy now
            </NavLink>
            {page && page === 'wish' && (
              <button
                type="button"
                className="wish__button"
                onClick={updateWishlistHandler}
              >
                <Heart
                  className={
                    isProductInWishlist
                      ? 'wish__icon wish__icon_active'
                      : 'wish__icon'
                  }
                />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
