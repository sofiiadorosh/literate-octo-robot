import React, { FC, useState } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectQuantity, selectUnit } from '@store/productDetails/selectors';
import { setQuantity, setUnit } from '@store/productDetails/slice';
import { Units } from '@types';

import './CountPicker.scss';

type CountPickerProps = {
  items: Units[];
  max: number;
};

export const CountPicker: FC<CountPickerProps> = ({ items, max }) => {
  const dispatch = useAppDispatch();
  const selectedQuantity = useAppSelector(selectQuantity);
  const selectedUnit = useAppSelector(selectUnit);

  const [error, setError] = useState<null | string>(null);

  const setCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.currentTarget.value);
    if (count > max) {
      return setError(`There are only ${max} items in stock.`);
    }
    setError(null);
    dispatch(setQuantity(count));
  };

  const setUnitHandler = (unit: Units) => {
    dispatch(setUnit(unit));
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
        value={selectedQuantity}
        onChange={setCountHandler}
      />
      <span className="count__dash"></span>
      <div className="count__unit">
        <span>{selectedUnit}</span>
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
