import React, { FC, useState, useEffect, useRef } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { useAppSelector } from '@hooks';
import { selectCart } from '@store/cart/selectors';
import { ButtonNames } from '@types';

import './CountPicker.scss';

enum PageNames {
  'PRODUCT' = 'product',
}

type CountPickerProps = {
  items: string[];
  max: number;
  count: number;
  unit: string;
  stock: string;
  page?: string;
  onSetCountByStep: (type: ButtonNames) => void;
  onSetCountByValue: (count: number) => void;
  onSetUnit: (unit: string) => void;
};

export const CountPicker: FC<CountPickerProps> = ({
  items,
  max,
  count,
  unit,
  onSetCountByValue,
  onSetCountByStep,
  onSetUnit,
  stock,
  page,
}) => {
  const cart = useAppSelector(selectCart);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const setErrorToNull = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const setCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.currentTarget.value);
    const orderedQuantity = cart
      .map(item => item.quantity)
      .reduce((acc, item) => (acc += item), 0);
    const leftQuantity = parseInt(stock) - orderedQuantity;
    if (Number.isNaN(count)) return;
    if (count > max && !orderedQuantity) {
      setError(`There are ${max} items in stock.`);
      setErrorToNull();
      return;
    } else if (
      count > leftQuantity &&
      orderedQuantity &&
      page &&
      page === 'product'
    ) {
      setError(`There are ${leftQuantity} items left in stock.`);
      setErrorToNull();
      return;
    } else if (count < 1) {
      setError('At least 1 item has to be to add to cart.');
      setErrorToNull();
    }
    onSetCountByValue(count);
  };

  const setUnitHandler = (unit: string) => {
    onSetUnit(unit);
  };

  const onButtonClickHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = e => {
    const typeButton = e.currentTarget.getAttribute('data-type') as ButtonNames;
    const orderedQuantity = cart
      .map(item => item.quantity)
      .reduce((acc, item) => (acc += item), 0);
    const leftQuantity = parseInt(stock) - orderedQuantity;
    if (
      typeButton === ButtonNames.SUP &&
      count === max &&
      !orderedQuantity &&
      page &&
      page === PageNames.PRODUCT
    ) {
      setError(`There are ${max} items in stock.`);
      setErrorToNull();
      return;
    } else if (
      typeButton === ButtonNames.SUP &&
      page &&
      page === PageNames.PRODUCT &&
      (count === leftQuantity || !leftQuantity) &&
      orderedQuantity
    ) {
      setError(`There are ${leftQuantity} items left in stock.`);
      setErrorToNull();
      return;
    } else if (typeButton === ButtonNames.SUP && count === max) {
      setError(`There are ${max} items in stock.`);
      setErrorToNull();
      return;
    } else if (typeButton === ButtonNames.SUB && count - 1 < 1) {
      setError('At least 1 item has to be to add to cart.');
      setErrorToNull();
      return;
    }
    onSetCountByStep(typeButton);
  };

  const openMenuHandler = () => setMenuOpen(true);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const blurHandler = () => {
    if (!count) {
      onSetCountByValue(1);
    }
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [unit]);

  return (
    <div className="count">
      <input
        type="password"
        name="password"
        autoComplete="new-password"
        style={{ display: 'none' }}
      />
      <input
        name="count"
        type="text"
        min="1"
        max={max}
        placeholder="1"
        className="count__input"
        value={count}
        autoComplete="off"
        onChange={setCountHandler}
        onBlur={blurHandler}
      />
      <div className="count__control">
        <button
          type="button"
          className="count__button"
          data-type={ButtonNames.SUP}
          onClick={onButtonClickHandler}
        >
          <Arrow className="count__icon count__icon_sup" />
        </button>
        <button
          type="button"
          disabled={count <= 1}
          className="count__button"
          data-type={ButtonNames.SUB}
          onClick={onButtonClickHandler}
        >
          <Arrow className="count__icon count__icon_sub" />
        </button>
      </div>
      <span className="count__dash"></span>
      <div className="count__unit" onClick={openMenuHandler}>
        <span>{unit}</span>
        <Arrow className="count__unit-icon" />
        {menuOpen && (
          <div className="count__dropdown" ref={dropdownRef}>
            <ul className="count__list">
              {items.map(item => (
                <li
                  key={item}
                  className="count__item"
                  onClick={() => setUnitHandler(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && <p className="count__error">{error}</p>}
    </div>
  );
};
