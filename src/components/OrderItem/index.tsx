import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Remove } from '@assets/close.svg';
import { ReactComponent as Heart } from '@assets/heart.svg';
import { CountPicker } from '@components/CountPicker';
import { Stars } from '@components/Stars';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectPromocodeDiscount } from '@store/cart/selectors';
import { updateCartItem, removeFromCart } from '@store/cart/slice';
import { CartItem, ButtonNames } from '@types';
import { setFixedPrice } from '@utils';

import './OrderItem.scss';

type OrderItemProps = {
  item: CartItem;
};

export const OrderItem: FC<OrderItemProps> = ({
  item: {
    product: {
      id,
      title,
      farm,
      fresheness,
      rating,
      previewImage,
      units,
      stock,
      price,
      discount,
    },
    id: itemId,
    chosenUnit,
    chosenQuantity,
  },
}) => {
  const dispatch = useAppDispatch();
  const promocodeDiscount = useAppSelector(selectPromocodeDiscount);

  const maxQuantity = parseInt(stock);

  const [unit, setUnit] = useState(chosenUnit);
  const [count, setCount] = useState(chosenQuantity);

  const getTotalPrice = () => {
    return setFixedPrice(price[unit] * chosenQuantity);
  };

  const getNewTotalPrice = () => {
    const totalDiscount = (1 - discount / 100) * (1 - promocodeDiscount / 100);

    return setFixedPrice(price[unit] * totalDiscount * chosenQuantity);
  };

  const setUnitHandler = (unit: string) => {
    setUnit(unit);
  };

  const setCountHandler = (count: number) => {
    setCount(count);
  };

  const setNextCountHandler = (typeButton: ButtonNames) => {
    if (typeButton === ButtonNames.SUP) {
      setCount(prevState => prevState + 1);
    } else if (typeButton === ButtonNames.SUB) {
      setCount(prevState => prevState - 1);
    }
  };

  useEffect(() => {
    setCount(chosenQuantity);
  }, [chosenQuantity]);

  useEffect(() => {
    dispatch(updateCartItem({ _id: itemId, id, unit }));
  }, [unit]);

  useEffect(() => {
    dispatch(updateCartItem({ _id: itemId, id, quantity: count }));
  }, [count]);

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <li className="order__item">
      <div className="order__content">
        <NavLink to={`/products/${id}`} className="order__thumb">
          <img src={previewImage} alt={title} className="order__image" />
        </NavLink>
        <div className="order__control">
          <button type="button" className="order__button">
            <Heart className="order__button-icon order__wish-icon" />
            <span>Wishlist</span>
          </button>
          <button
            type="button"
            className="order__button"
            onClick={removeFromCartHandler}
          >
            <Remove className="order__button-icon order__remove-icon" />
            <span>Remove</span>
          </button>
        </div>
      </div>
      <div className="order__product-summary">
        <div className="order__info">
          <h3 className="order__name">
            <NavLink to={`/products/${id}`} className="order__link">
              {title}
            </NavLink>
          </h3>
          <ul className="order__info-list">
            <li className="order__info-item">
              <span className="order__info-item_color_grey">Farm:</span>
              <span>{farm}</span>
            </li>
            <li className="order__info-item">
              <span className="order__info-item_color_grey">Freshness:</span>
              <span>{fresheness}</span>
            </li>
          </ul>
          <div className="order__rating">
            <Stars rating={rating} />
          </div>
        </div>
        <div className="order__quantity">
          <div className="order__price">
            <span>{getNewTotalPrice()} USD</span>
            <span className="order__price_old">{getTotalPrice()}</span>
          </div>
          <CountPicker
            items={units}
            max={maxQuantity}
            count={count}
            unit={unit}
            onSetUnit={setUnitHandler}
            onSetCountByValue={setCountHandler}
            onSetCountByStep={setNextCountHandler}
          />
        </div>
      </div>
    </li>
  );
};
