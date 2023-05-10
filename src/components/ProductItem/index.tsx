import React, { FC } from 'react';

import { Product } from '@types';

import { ReactComponent as Star } from '@assets/star.svg';
import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ReactComponent as Heart } from '@assets/heart.svg';

import './ProductItem.scss';

type ProductItemProps = {
  item: Product;
};

export const ProductItem: FC<ProductItemProps> = ({
  item: {
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
      <div className="product__thumb">
        <img src={image} alt={title} className="product__image" />
      </div>
      <div className="product__content">
        <div className="product-info">
          <h2 className="product-info__title">{title}</h2>
          <p className="product-info__description">
            {description.substring(0, 51)}...
          </p>
          <ul className="product-info__rating">
            <li className="rating-item">
              <Star className="rating-item__icon" />
            </li>
            <li className="rating-item">
              <Star className="rating-item__icon" />
            </li>
            <li className="rating-item">
              <Star className="rating-item__icon" />
            </li>
            <li className="rating-item">
              <Star className="rating-item__icon" />
            </li>
            <li className="rating-item">
              <Star className="rating-item__icon" />
            </li>
          </ul>
          <ul className="product-info__list">
            <li className="product-info__item">
              <span>Fresheness</span>
              <span>
                <span className="product-info__item--accent">New </span>(
                {fresheness})
              </span>
            </li>
            <li className="product-info__item">
              <span>Farm</span>
              <span>{farm}</span>
            </li>
            <li className="product-info__item">
              <span>Delivery</span>
              <span>{delivery}</span>
            </li>
            <li className="product-info__item">
              <span>Stock</span>
              <span className="product-info__item--accent">{stock}</span>
            </li>
          </ul>
        </div>
        <div className="product-order">
          <span className="product-order__price--old">{price.new} USD</span>
          <span className="product-order__price--new">{price.old}</span>
          <span className="product-order__shipping">{shipping} Shipping</span>
          <span className="product-order__delivery">
            Delivery in {deliveryTime} days
          </span>
          <div className="product-order__button">
            <button type="button" className="primary-button">
              <span>Product Detail</span>
              <Arrow className="primary-button__icon" />
            </button>
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
