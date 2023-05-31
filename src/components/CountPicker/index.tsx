import React, { FC, useState, useEffect, useRef } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ButtonNames } from '@types';

import './CountPicker.scss';

type CountPickerProps = {
  items: string[];
  max: number;
  count: number;
  unit: string;
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
}) => {
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
    if (Number.isNaN(count)) return;
    if (count > max) {
      setError(`There are only ${max} items in stock.`);
      setErrorToNull();
      return;
    } else if (!count) {
      setError('At least 1 item has to be to add to cart.');
      setErrorToNull();
    } else if (count < 0) {
      return;
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
    if (typeButton === ButtonNames.SUP && count === max) {
      setError(`There are only ${max} items in stock.`);
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

  useEffect(() => {
    setMenuOpen(false);
  }, [unit]);

  return (
    <div className="count">
      <input
        name="count"
        type="text"
        min="1"
        max={max}
        placeholder="1"
        className="count__input"
        value={count}
        onChange={setCountHandler}
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