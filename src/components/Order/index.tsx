import React, { FC, useEffect, useState, useRef } from 'react';

import { ReactComponent as Clear } from '@assets/close.svg';
import { DefaultCart } from '@components/DefaultCart';
import { OrderList } from '@components/OrderList';
import { useAppSelector, useAppDispatch } from '@hooks';
import {
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
import { Promocode } from '@types';
import {
  getFormattedDate,
  getRandomValue,
  getDeliveryTime,
  setFixedPrice,
} from '@utils';

import './Order.scss';

enum PromocodeRange {
  'MAX' = 50,
  'MIN' = 10,
}

enum TaxRange {
  'MAX' = 30,
  'MIN' = 10,
}

enum PromocodeMessage {
  'EMPTY' = 'Please enter a promocode.',
  'INVALID' = 'Invalid promo code. Please try again.',
  'VALID' = 'Promo code was applied successfully!',
}

export const Order: FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const isPromocodeApplied = useAppSelector(selectIsPromocodeApplied);
  const promocodeDiscount = useAppSelector(selectPromocodeDiscount);
  const tax = useAppSelector(selectTax);
  const inputRef = useRef<HTMLInputElement>(null);

  const promocodes = Object.values(Promocode);

  const [taxation, setTaxation] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');
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

  useEffect(() => {
    const date = getDeliveryDate();
    const formattedDate = getFormattedDate(date);
    setDeliveryDate(formattedDate);
  }, []);

  useEffect(() => {
    getTaxation();
  }, [tax, items]);

  const getTaxation = () => {
    const calculatedTax = setFixedPrice(subTotalPrice * (tax / 100));
    setTaxation(calculatedTax);
  };

  const getTotalPrice = () => setFixedPrice(subTotalPrice + taxation);

  const getDeliveryDate = () => {
    const date = items.map(({ product }) => product.deliveryTime);
    const greaterDate = Math.max(...date);
    return getDeliveryTime(greaterDate);
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

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const promocode = formData.get('promocode') as string;
    if (!promocode) {
      setMessage(PromocodeMessage.EMPTY);
      setEmptyMessage();
      return;
    }
    const isValidPromocode = promocodes.some(item => item === promocode);
    if (isValidPromocode) {
      dispatch(applyPromocode());
      clearInputHandler();
      setMessage(PromocodeMessage.VALID);
      setEmptyMessage();
      return;
    }
    setMessage(PromocodeMessage.INVALID);
    setEmptyMessage();
  };

  return (
    <div className="order">
      {items.length ? (
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
              placeholder="Apply promo code"
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
                Guaranteed delivery day: {deliveryDate}
              </p>
            </div>
            <span className="order__total-price">{getTotalPrice()} USD</span>
          </div>
        </>
      ) : (
        <DefaultCart />
      )}
    </div>
  );
};
