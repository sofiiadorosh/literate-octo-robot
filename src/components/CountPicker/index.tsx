import React, { FC, useState, useEffect } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { Buttons } from '@components/AboutProduct';

import './CountPicker.scss';

type CountPickerProps = {
  items: string[];
  max: number;
  count: number;
  unit: string;
  onSetCountByStep: (type: Buttons) => void;
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
  const validCount = count <= max && count >= 1;

  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (validCount && !error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [validCount, error]);

  const setCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.currentTarget.value);
    if (Number.isNaN(count)) return;
    if (count > max) {
      return setError(`There are only ${max} items in stock.`);
    }
    if (count < 0) {
      return;
    }
    setError(null);
    onSetCountByValue(count);
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const count = Number(e.currentTarget.value);
    if (count <= max) {
      return setError(null);
    }
  };

  const setUnitHandler = (unit: string) => {
    onSetUnit(unit);
  };

  const onButtonClickHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = e => {
    const typeButton = e.currentTarget.getAttribute('data-type') as Buttons;
    if (typeButton === Buttons.SUP && count === max) {
      return setError(`There are only ${max} items in stock.`);
    } else if (typeButton === Buttons.SUB && count - 1 < 1) {
      return setError('At least 1 item has to be to add to cart.');
    }
    setError(null);
    onSetCountByStep(typeButton);
  };

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
        onBlur={onBlurHandler}
      />
      <div>
        <button
          type="button"
          className="count__button"
          data-type={Buttons.SUP}
          onClick={onButtonClickHandler}
        >
          <Arrow className="count__icon count__icon_sup" />
        </button>
        <button
          type="button"
          className="count__button"
          data-type={Buttons.SUB}
          onClick={onButtonClickHandler}
        >
          <Arrow className="count__icon count__icon_sub" />
        </button>
      </div>
      <span className="count__dash"></span>
      <div className="count__unit">
        <span>{unit}</span>
        <Arrow className="count__unit-icon" />
        <div className="dropdown">
          <ul className="dropdown__list">
            {items.map(item => (
              <li
                key={item}
                className="dropdown__item"
                onClick={() => setUnitHandler(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {error && <p className="count__error">{error}</p>}
    </div>
  );
};
