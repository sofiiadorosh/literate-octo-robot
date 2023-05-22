import React, { FC, useState, useCallback, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { selectPrice } from '@store/filters/selectors';
import { setMinPrice, setMaxPrice } from '@store/filters/slice';
import { Price } from '@types';

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

  const [inputValue, setInputValue] = useState({ min: minVal, max: maxVal });
  const [incorrectInput, setIncorrectInput] = useState({
    min: false,
    max: false,
  });
  const [error, setError] = useState<string | null>(null);

  const incorrectMinValue =
    inputValue.min < min || inputValue.min >= inputValue.max;
  const incorrectMaxValue =
    inputValue.max > max || inputValue.max <= inputValue.min;

  useEffect(() => {
    if (!selectedPrice.min && !selectedPrice.max) {
      dispatch(setMinPrice(min));
      dispatch(setMaxPrice(max));
    }
  }, [selectedPrice.min, selectedPrice.max]);

  useEffect(() => {
    setInputValue({ min: minVal, max: maxVal });
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
      return setIncorrectInput(prevState => ({ ...prevState, min: true }));
    }
    return setIncorrectInput(prevState => ({ ...prevState, min: false }));
  }, [inputValue.min, inputValue.max]);

  useEffect(() => {
    if (incorrectMaxValue) {
      return setIncorrectInput(prevState => ({ ...prevState, max: true }));
    }
    return setIncorrectInput(prevState => ({ ...prevState, max: false }));
  }, [inputValue.max, inputValue.min]);

  useEffect(() => {
    if (incorrectInput.min || incorrectInput.max) {
      setError(
        `The prices should be between ${min} and ${max} USD. Min price can't be greater/equal than max.`
      );
    } else {
      setError(null);
    }
  }, [incorrectInput.min, incorrectInput.max]);

  const changeMinNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    if (value < maxVal && value >= min) {
      dispatch(setMinPrice(value));
      setInputValue(prevState => ({ ...prevState, min: value }));
      minValRef.current = value;
    }
  };

  const changeMaxNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    if (value > minVal && value <= max) {
      dispatch(setMaxPrice(value));
      setInputValue(prevState => ({ ...prevState, max: value }));
      maxValRef.current = value;
    }
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, inputName: 'min' | 'max') => {
      const value = Number(e.target.value);
      if (Number.isNaN(value)) return;
      setInputValue(prevState => ({ ...prevState, [inputName]: value }));
      if (inputName === 'min' && value >= min && value <= inputValue.max) {
        dispatch(setMinPrice(value));
        minValRef.current = value;
      } else if (
        inputName === 'max' &&
        value <= max &&
        value >= inputValue.min
      ) {
        dispatch(setMaxPrice(value));
        maxValRef.current = value;
      }
    },
    [dispatch]
  );

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
            value={inputValue.min}
            onChange={e => handleInputChange(e, 'min')}
            className={
              incorrectInput.min
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
            value={inputValue.max}
            onChange={e => handleInputChange(e, 'max')}
            className={
              incorrectInput.max
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
