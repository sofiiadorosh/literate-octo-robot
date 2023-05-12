import React, { FC, useCallback, useEffect, useState, useRef } from 'react';

import './PriceFilter.scss';

type PriceFilterProps = {
  min: number;
  max: number;
};

export const PriceFilter: FC<PriceFilterProps> = ({ min, max }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  const changeMinNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
  };

  const changeMaxNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;
  };

  return (
    <div className="filter price-filter">
      <h3 className="filter__title">Price</h3>
      <div className="range-input">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={changeMinNumberHandler}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - min ? 5 : 4 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={changeMaxNumberHandler}
          className="thumb thumb--right"
        />
        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
      <div className="range-input__control">
        <div className="control__container">
          <label htmlFor="min" className="control__label">
            Min
          </label>
          <input
            id="min"
            type="number"
            value={minVal}
            onChange={changeMinNumberHandler}
            placeholder="0"
            className="control__input"
          />
        </div>
        <span className="control__dash">-</span>
        <div className="control__container">
          <label htmlFor="max" className="control__label">
            Max
          </label>
          <input
            id="max"
            type="number"
            value={maxVal}
            onChange={changeMaxNumberHandler}
            placeholder="000"
            className="control__input"
          />
        </div>
      </div>
    </div>
  );
};
