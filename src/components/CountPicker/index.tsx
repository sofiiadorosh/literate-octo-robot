import React, { FC, useState } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';

import './CountPicker.scss';

type CountPickerProps = {
  items: string[];
  max: number;
  count: number;
  unit: string;
  onSetCount: (count: number) => void;
  onSetUnit: (unit: string) => void;
};

export const CountPicker: FC<CountPickerProps> = ({
  items,
  max,
  count,
  unit,
  onSetCount,
  onSetUnit,
}) => {
  const [error, setError] = useState<null | string>(null);

  const setCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.currentTarget.value);
    if (count > max) {
      return setError(`There are only ${max} items in stock.`);
    }
    setError(null);
    onSetCount(count);
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
  return (
    <div className="count">
      <input
        name="count"
        type="number"
        min="1"
        max={max}
        placeholder="1"
        className="count__input"
        value={count}
        onChange={setCountHandler}
        onBlur={onBlurHandler}
      />
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
