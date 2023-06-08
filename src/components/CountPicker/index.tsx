import React, { FC, useState, useEffect, useRef } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ButtonNames } from '@types';

import './CountPicker.scss';

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
  const isCountGreaterThanMax = count > max && !ordered;
  const isCountLessThanOne = count - 1 < 1;
  const isCountMaxOrNoRemainder = (count === max || !remainder) && ordered;
  const isExceedingRemainderOrMax =
    (count > remainder || count > max) && page && page === 'product';
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

  const setCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.currentTarget.value);
    if (Number.isNaN(count)) return;
    if (isCountGreaterThanMax || count > max) {
      setError(`There are ${max} items in stock.`);
      return;
    } else if (isExceedingRemainderOrMax) {
      setError(`There are ${remainder} items in stock.`);
      return;
    } else if (!count) {
      onSetCountByValue(count);
      setError('At least 1 item has to be to add to cart.');
      return;
    }
    onSetCountByValue(count);
  };

  const onButtonClickHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = e => {
    const typeButton = e.currentTarget.getAttribute('data-type') as ButtonNames;
    if (
      (typeButton === ButtonNames.SUP && count === max && !ordered) ||
      (typeButton === ButtonNames.SUP && isCountMaxOrNoRemainder)
    ) {
      setError(`There are ${max} items in stock.`);
      return;
    } else if (typeButton === ButtonNames.SUP && areProductsAvailable) {
      setError(`There are ${remainder} items  left in stock.`);
      return;
    } else if (typeButton === ButtonNames.SUB && isCountLessThanOne) {
      setError('At least 1 item has to be to add to cart.');
      return;
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
