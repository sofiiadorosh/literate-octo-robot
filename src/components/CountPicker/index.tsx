import React, { FC, useState, useEffect, useRef } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ButtonNames } from '@types';

import './CountPicker.scss';

enum ProductsQuantity {
  'MAX' = 'max',
  'REMAINDER' = 'remainder',
}

enum ErrorMessage {
  MAX_STOCK = 'There are max items in stock.',
  REMAINING_STOCK = 'There are remainder items left in stock.',
  MIN_COUNT = 'At least 1 item has to be added to cart.',
}

type CountPickerProps = {
  items: string[];
  max: number;
  count: number;
  unit: string;
  ordered: number;
  remainder: number;
  onSetCountByStep: (type: ButtonNames) => void;
  onSetCountByValue: (count: number) => void;
  onSetUnit: (unit: string) => void;
  page?: string;
};

export const CountPicker: FC<CountPickerProps> = ({
  items,
  max,
  count,
  unit,
  ordered,
  remainder,
  page,
  onSetCountByValue,
  onSetCountByStep,
  onSetUnit,
}) => {
  const areProductsAvailable =
    (count === remainder || !remainder) &&
    ordered &&
    page &&
    page === 'product';
  const isCountLessThanOne = count - 1 < 1;
  const isCountMaxOrNoRemainder = (count === max || !remainder) && ordered;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    setMenuOpen(false);
  }, [unit]);

  const setUnitHandler = (unit: string) => {
    onSetUnit(unit);
  };

  const setErrorMessage = (message: ErrorMessage, countName?: string) => {
    if (countName) {
      return setError(
        message.replace(
          countName,
          String(countName === ProductsQuantity.MAX ? max : remainder)
        )
      );
    }
    return setError(message);
  };

  const setCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.currentTarget.value);
    if (Number.isNaN(count)) return;
    const isCountGreaterThanMax = count > max && !ordered && max === remainder;
    const isExceedingRemainder =
      count > remainder && ordered && page && page === 'product';
    if (isCountGreaterThanMax) {
      return setErrorMessage(ErrorMessage.MAX_STOCK, ProductsQuantity.MAX);
    }
    if (isExceedingRemainder) {
      return setErrorMessage(
        ErrorMessage.REMAINING_STOCK,
        ProductsQuantity.REMAINDER
      );
    }
    if (count > max) {
      return setErrorMessage(ErrorMessage.MAX_STOCK, ProductsQuantity.MAX);
    }
    if (!count) {
      onSetCountByValue(count);
      setErrorMessage(ErrorMessage.MIN_COUNT);
      return;
    }
    onSetCountByValue(count);
  };

  const onButtonClickHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = e => {
    const typeButton = e.currentTarget.getAttribute('data-type') as ButtonNames;
    switch (typeButton) {
      case ButtonNames.SUP:
        if ((count === max && !ordered) || isCountMaxOrNoRemainder) {
          return setErrorMessage(ErrorMessage.MAX_STOCK, ProductsQuantity.MAX);
        } else if (areProductsAvailable) {
          return setErrorMessage(
            ErrorMessage.REMAINING_STOCK,
            ProductsQuantity.REMAINDER
          );
        }
        break;

      case ButtonNames.SUB:
        if (isCountLessThanOne) {
          return setErrorMessage(ErrorMessage.MIN_COUNT);
        }
        break;

      default:
        break;
    }
    onSetCountByStep(typeButton);
  };

  const openMenuHandler = () => setMenuOpen(true);

  const blurHandler = () => {
    if (!count) {
      onSetCountByValue(1);
    }
  };

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
