import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ReactComponent as Heart } from '@assets/heart.svg';
import { Stars } from '@components/Stars';
import { Product } from '@types';

import './ProductItem.scss';

type ProductItemProps = {
  item: Product;
};

export const ProductItem: FC<ProductItemProps> = ({
  item: {
    id,
    image,
    title,
    description,
    rating,
    fresheness,
    farm,
    delivery,
    stock,
    price,
    shipping,
    deliveryTime,
  },
}) => {
  return (
    <li className="product">
      <NavLink to={id} className="product__thumb">
        <img src={image} alt={title} className="product__image" />
      </NavLink>
      <div className="product__content">
        <div className="product-info">
          <div className="product-info__main">
            <h2 className="product-info__title">
              <NavLink to={id} className="product__link">
                {title}
              </NavLink>
            </h2>
            <p className="product-info__description">
              {description.substring(0, 50)}...
            </p>
            <Stars rating={rating} />
          </div>
          <ul className="product-info__list">
            <li className="product-info__item">
              <span>Fresheness</span>
              <span className="product-info__name product-info__name_accent">
                {fresheness}
              </span>
            </li>
            <li className="product-info__item">
              <span>Farm</span>
              <span className="product-info__name">{farm}</span>
            </li>
            <li className="product-info__item">
              <span>Delivery</span>
              <span>{delivery}</span>
            </li>
            <li className="product-info__item">
              <span>Stock</span>
              <span className="product-info__name product-info__name_accent">
                {stock}
              </span>
            </li>
          </ul>
        </div>
        <div className="product-order">
          <div className="product-order__price">
            <span className="product-order__price_price_old">
              {price.new} USD
            </span>
            <span className="product-order__price_price_new">{price.old}</span>
          </div>
          <div className="product-order__info">
            <span className="product-order__shipping">{shipping} Shipping</span>
            <span className="product-order__delivery">
              Delivery in {deliveryTime} days
            </span>
          </div>
          <div className="product-order__button">
            <NavLink to={id} className="primary-button">
              <span>Product Detail</span>
              <Arrow className="primary-button__icon" />
            </NavLink>
            <button type="button" className="secondary-button">
              <Heart className="secondary-button__icon" />
              <span>Add to wish list</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
