import React, { FC, useState } from 'react';

import { ReactComponent as Heart } from '@assets/heart.svg';
import { ReactComponent as Plus } from '@assets/plus.svg';
import { CountPicker } from '@components/CountPicker';
import { Stars } from '@components/Stars';
import { useAppSelector } from '@hooks';
import { selectProductDetails } from '@store/productDetails/selectors';
import { getNewPrice } from '@utils';

import './AboutProduct.scss';

export const AboutProduct: FC = () => {
  const selectedProduct = useAppSelector(selectProductDetails);

  if (!selectedProduct) {
    return null;
  }
  const {
    images,
    overview,
    title,
    country,
    color,
    stock,
    sizes,
    units,
    category,
    rating,
    shipping,
    deliveryArea,
    deliveryTime,
    discount,
    price,
    reviews,
  } = selectedProduct;
  const maxQuantity = parseInt(stock);
  const [unit, setUnit] = useState(units[0]);
  const [count, setCount] = useState(1);

  const getTotalPrice = () => {
    const newPrice = getNewPrice(price[unit], discount);
    return Number(newPrice * count).toFixed(2);
  };

  const setUnitHandler = (unit: string) => {
    setUnit(unit);
  };

  const setCountHandler = (count: number) => {
    setCount(count);
  };

  return (
    <div className="details">
      <div className="details__appearance">
        <div className="details__tag-wrapper">
          <span className="details__tag">- {discount}%</span>
          <span className="details__tag">{shipping} shipping</span>
        </div>
        <div className="details__image-wrapper">
          {images.map(image => (
            <div key={image} className="details__thumb">
              <img src={image} alt={title} className="details__image" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="details__overview">
          <div className="details__info">
            <h1 className="details__name">{title}</h1>
            <div className="details__rating">
              <Stars rating={rating} />
              <span className="details__review">
                ({reviews?.length} customer review)
              </span>
            </div>
          </div>
          <p className="details__description">{overview}</p>
          <ul className="details__list">
            <li className="details__item">
              <span className="details__item_color_grey">Country:</span>
              <span>{country}</span>
            </li>
            <li className="details__item">
              <span className="details__item_color_grey">Size:</span>
              <span>{sizes.join(', ')}</span>
            </li>
            <li className="details__item">
              <span className="details__item_color_grey">Category:</span>
              <span>{category}</span>
            </li>
            <li className="details__item">
              <span className="details__item_color_grey">Buy by:</span>
              <span>{units.join(', ')}</span>
            </li>
            <li className="details__item">
              <span className="details__item_color_grey">Stock:</span>
              <span>{maxQuantity ? 'In stock' : 'Unavailable'}</span>
            </li>
            <li className="details__item">
              <span className="details__item_color_grey">Delivery:</span>
              <span>in {deliveryTime} days</span>
            </li>
            {color && (
              <li className="details__item">
                <span className="details__item_color_grey">Color:</span>
                <span>{color}</span>
              </li>
            )}
            <li className="details__item">
              <span className="details__item_color_grey">Delivery area</span>
              <span>{deliveryArea}</span>
            </li>
          </ul>
          <div>
            <div className="details__price-info">
              <div className="details__price">
                <span>{getTotalPrice()} USD</span>
                <span className="details__price_old">
                  {(price[unit] * count).toFixed(2)} USD
                </span>
              </div>
              <div className="details__control-wrapper">
                <CountPicker
                  items={units}
                  max={maxQuantity}
                  count={count}
                  unit={unit}
                  onSetUnit={setUnitHandler}
                  onSetCount={setCountHandler}
                />
                <button
                  type="button"
                  className="primary-button details__add-button"
                >
                  <Plus className="details__add-icon" />
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
            <button
              type="button"
              className="secondary-button details__wish-button"
            >
              <Heart className="details__wish-icon" />
              <span>Add to my wish list</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
