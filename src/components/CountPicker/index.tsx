import React, { FC, useState } from 'react';

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
    const typeButton = e.currentTarget.getAttribute('data-type') as Buttons;
    if (typeButton === Buttons.SUP && count === max) {
      setError(`There are only ${max} items in stock.`);
      setErrorToNull();
      return;
    } else if (typeButton === Buttons.SUB && count - 1 < 1) {
      setError('At least 1 item has to be to add to cart.');
      setErrorToNull();
      return;
    }
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
