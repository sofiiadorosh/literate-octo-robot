import React, { FC, useState, useCallback, useEffect, useRef } from 'react';

import { Price } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { setMinPrice, setMaxPrice } from '@store/filters/slice';
import { selectPrice } from '@store/filters/selectors';

import './PriceFilter.scss';

type PriceFilterProps = {
  priceRange: Price;
};

export const PriceFilter: FC<PriceFilterProps> = ({
  priceRange: { min, max },
}) => {
  const dispatch = useAppDispatch();
  const selectedPrice = useAppSelector(selectPrice);

  const minVal = selectedPrice.min;
  const maxVal = selectedPrice.max;

  const minValRef = useRef(minVal);
  const maxValRef = useRef(maxVal);
  const range = useRef<HTMLDivElement>(null);

  const [minInput, setMinInput] = useState(minVal);
  const [maxInput, setMaxInput] = useState(maxVal);
  const [incorrectMinInput, setIncorrectMinInput] = useState(false);
  const [incorrectMaxInput, setIncorrectMaxInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const incorrectMinValue = minInput < min || minInput >= maxInput;
  const incorrectMaxValue = maxInput > max || maxInput <= minInput;

  useEffect(() => {
    if (!selectedPrice.min && !selectedPrice.max) {
      dispatch(setMinPrice(min));
      dispatch(setMaxPrice(max));
    }
  }, [selectedPrice.min, selectedPrice.max]);

  useEffect(() => {
    setMinInput(minVal);
    setMaxInput(maxVal);
    minValRef.current = minVal;
    maxValRef.current = maxVal;
  }, [minVal, maxVal, selectedPrice.min, selectedPrice.max]);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    if (incorrectMinValue) {
      setIncorrectMinInput(prevState => !prevState);
    }
  }, [minInput, maxInput]);

  useEffect(() => {
    if (incorrectMaxValue) {
      setIncorrectMaxInput(prevState => !prevState);
    }
  }, [maxInput, minInput]);

  useEffect(() => {
    if (incorrectMinInput || incorrectMaxInput) {
      setError(
        `The prices should be between ${min} and ${max} USD. Min price can't be greater/equal than max.`
      );
    } else {
      setError(null);
    }
  }, [incorrectMinInput, incorrectMaxInput]);

  const changeMinNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    if (value < maxVal && value >= min) {
      dispatch(setMinPrice(value));
      setMinInput(value);
      minValRef.current = value;
    }
  };

  const changeMaxNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    if (value > minVal && value <= max) {
      dispatch(setMaxPrice(value));
      setMaxInput(value);
      maxValRef.current = value;
    }
  };

  const changeMinInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    setMinInput(value);
    if (value >= min && value <= maxInput) {
      dispatch(setMinPrice(value));
      minValRef.current = value;
    }
  };

  const changeMaxInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    setMaxInput(value);
    if (value <= max && value >= minInput) {
      dispatch(setMaxPrice(value));
      maxValRef.current = value;
    }
  };

  return (
    <div className="filter price__filter">
      <h3 className="filter__title">Price</h3>
      <div className="price__range-input">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={changeMinNumberHandler}
          className="price__thumb price__thumb_left"
          style={{ zIndex: minVal > max - min ? 5 : 4 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={changeMaxNumberHandler}
          className="price__thumb price__thumb_right"
        />
        <div className="price__slider">
          <div className="price__track" />
          <div ref={range} className="price__range" />
        </div>
      </div>
      <div className="price__control">
        <div className="price__container">
          <label htmlFor="min" className="price__label">
            Min
          </label>
          <input
            id="min"
            type="text"
            value={minInput}
            onChange={changeMinInputHandler}
            className={
              incorrectMinInput
                ? 'price__input price__input_incorrect'
                : 'price__input'
            }
          />
        </div>
        <span className="price__dash">-</span>
        <div className="price__container">
          <label htmlFor="max" className="price__label">
            Max
          </label>
          <input
            id="max"
            type="text"
            value={maxInput}
            onChange={changeMaxInputHandler}
            className={
              incorrectMaxInput
                ? 'price__input price__input_incorrect'
                : 'price__input'
            }
          />
        </div>
      </div>
      {error && <p className="price__error">{error}</p>}
    </div>
  );
};
