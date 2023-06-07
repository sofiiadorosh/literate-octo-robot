import React, { FC, useEffect, useState, useRef } from 'react';

import { ReactComponent as Clear } from '@assets/close.svg';
import { DefaultCart } from '@components/DefaultCart';
import { OrderList } from '@components/OrderList';
import { useAppSelector, useAppDispatch, useAuth } from '@hooks';
import {
  selectCart,
  selectCartItems,
  selectIsPromocodeApplied,
  selectPromocodeDiscount,
  selectTax,
} from '@store/cart/selectors';
import {
  applyPromocode,
  setPromocodeDiscount,
  setTax,
} from '@store/cart/slice';
import { Promocode, PromocodeRange, TaxRange, PromocodeMessage } from '@types';
import {
  getFormattedDate,
  getRandomValue,
  getDeliveryTime,
  setFixedPrice,
} from '@utils';

import './Order.scss';

export const Order: FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const cart = useAppSelector(selectCart);
  const isPromocodeApplied = useAppSelector(selectIsPromocodeApplied);
  const promocodeDiscount = useAppSelector(selectPromocodeDiscount);
  const tax = useAppSelector(selectTax);
  const inputRef = useRef<HTMLInputElement>(null);

  const promocodes = Object.values(Promocode);
  const { user } = useAuth();
  const cartItems = cart.filter(item => item.userId === user?.id);

  const [taxation, setTaxation] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isPromocodeApplied && !promocodeDiscount) {
      const value = getRandomValue(PromocodeRange.MAX, PromocodeRange.MIN);
      dispatch(setPromocodeDiscount(value));
    }
  }, [isPromocodeApplied]);

  useEffect(() => {
    if (!tax) {
      const value = getRandomValue(TaxRange.MAX, TaxRange.MIN);
      dispatch(setTax(value));
    }
  }, []);

  const subTotalPrice = items.reduce(
    (acc, { product, chosenQuantity, chosenUnit }) => {
      const unit = product.units.find(unit => unit === chosenUnit);
      if (unit) {
        const price = product.price[chosenUnit];
        const totalDiscount =
          (1 - product.discount / 100) * (1 - promocodeDiscount / 100);

        acc += price * totalDiscount * chosenQuantity;
      }
      return setFixedPrice(acc);
    },
    0
  );

  const getOldTotalPrice = () => {
    return setFixedPrice(subTotalPrice / ((100 - promocodeDiscount) / 100));
  };

  useEffect(() => {
    getTaxation();
  }, [tax, items, subTotalPrice]);

  const getTaxation = () => {
    const calculatedTax = setFixedPrice(subTotalPrice * (tax / 100));
    setTaxation(calculatedTax);
  };

  const getTotalPrice = () => setFixedPrice(subTotalPrice + taxation);

  const getDeliveryDate = () => {
    const date = items.map(({ product }) => product.deliveryTime);
    const greaterDate = Math.max(...date);
    const time = getDeliveryTime(greaterDate);
    return getFormattedDate(time);
  };

  const clearInputHandler = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const setEmptyMessage = () => {
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const showMessage = (message: PromocodeMessage) => {
    clearInputHandler();
    setMessage(message);
    setEmptyMessage();
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPromocodeApplied) {
      return showMessage(PromocodeMessage.APPLIED);
    }
    const formData = new FormData(e.currentTarget);
    const promocode = formData.get('promocode') as string;
    if (!promocode.trim()) {
      return showMessage(PromocodeMessage.EMPTY);
    }
    const isValidPromocode = promocodes.some(
      item => item.trim() === promocode.trim()
    );
    if (isValidPromocode) {
      dispatch(applyPromocode());
      return showMessage(PromocodeMessage.VALID);
    }
    showMessage(PromocodeMessage.INVALID);
  };

  return (
    <div className="order">
      {cartItems.length ? (
        <>
          <h2 className="order__title">Order Summary</h2>
          <p className="order__description">
            Price can change depending on shipping method and taxes of your
            state.
          </p>
          <OrderList />
          <ul className="order__summary-list">
            <li className="order__summary-item">
              <span>Subtotal</span>
              <span>{subTotalPrice} USD</span>
            </li>
            <li className="order__summary-item">
              <span>Tax</span>
              <span>
                {tax}% {taxation} USD
              </span>
            </li>
            <li className="order__summary-item">
              <span>Promo code</span>
              <span>{promocodeDiscount}%</span>
            </li>
          </ul>
          <form
            className="order__field"
            autoComplete="off"
            onSubmit={onSubmitHandler}
          >
            <label htmlFor="promocode" className="order__label"></label>
            <input
              id="promocode"
              type="text"
              name="promocode"
              placeholder="Apply promo code PADAWAN"
              className="order__input"
              ref={inputRef}
            />
            {Boolean(message.length) && (
              <p className="order__message">{message}</p>
            )}
            <div className="order__button-control">
              <button
                type="button"
                className="order__clear-button"
                onClick={clearInputHandler}
              >
                <Clear className="order__clear-icon" />
              </button>
              <div className="order__divider"></div>
              <button type="submit" className="order__promocode-button">
                Apply now
              </button>
            </div>
          </form>
          <div className="order__total">
            <div className="order__total-name">
              <p>Total Order</p>
              <p className="order__delivery-day">
                Guaranteed delivery day: {getDeliveryDate()}
              </p>
            </div>
            <div className="order__total-price">
              <span>{getTotalPrice()} USD</span>
              {isPromocodeApplied && (
                <span className="order__total-price_old">
                  {getOldTotalPrice()}
                </span>
              )}
            </div>
          </div>
        </>
      ) : (
        <DefaultCart />
      )}
    </div>
  );
};
