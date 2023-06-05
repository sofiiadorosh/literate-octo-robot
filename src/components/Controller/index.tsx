import React, { FC, useState, useEffect, useRef } from 'react';
import {
  FieldErrors,
  UseFormRegister,
  useController,
  Control,
} from 'react-hook-form';

import { ReactComponent as Close } from '@assets/close.svg';
import { ReactComponent as TopBottom } from '@assets/top-bottom.svg';
import { useAppDispatch } from '@hooks';
import { setData } from '@store/cart/slice';
import { FormValues, OptionType } from '@types';

type InputControllerProps = {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  options: OptionType[];
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues>;
  onSetCountry?: (selectedOption: string) => void;
  watch: (name: string | boolean) => string | boolean;
};

enum Controller {
  'COUNTRY' = 'countryName',
  'CITY' = 'cityName',
}

export const InputController: FC<InputControllerProps> = ({
  name,
  label,
  placeholder,
  errors,
  options,
  onSetCountry,
  watch,
  control,
}) => {
  const dispatch = useAppDispatch();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const {
    field: { onChange: onCityChange },
  } = useController({
    name: Controller.CITY,
    control,
  });
  const controlledValue = watch(name);

  useEffect(() => {
    dispatch(setData({ [name]: controlledValue }));
  }, [value, dispatch]);

  const menuRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const setOptionHandler = (option: string) => {
    onChange(option);
    setMenuOpen(false);
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputValue(value);
    onChange(value);
  };

  const onFocusHandler: React.FocusEventHandler<HTMLInputElement> = () => {
    setMenuOpen(true);
  };

  const onClearInputHandler = () => {
    onChange('');
    setInputValue('');
  };

  const onOpenMenuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenuOpen(true);
  };

  useEffect(() => {
    const updatedOptions = options.filter(option =>
      option.value
        .trim()
        .toLowerCase()
        .includes(inputValue.trim().toLowerCase())
    );
    setFilteredOptions(updatedOptions);
  }, [inputValue, options]);

  useEffect(() => {
    if (!value) {
      onCityChange('');
    }
  }, [value]);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      e.target !== inputRef.current
    ) {
      setMenuOpen(false);
      onChange('');
      setInputValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="billing__field">
      <input
        id={name}
        disabled={
          name === Controller.CITY && watch && !watch(Controller.COUNTRY)
        }
        type="text"
        autoComplete="off"
        value={String(value)}
        placeholder={placeholder}
        className="billing__input"
        ref={inputRef}
        onChange={onInputChangeHandler}
        onFocus={onFocusHandler}
      />
      <div className="billing__control">
        <button
          type="button"
          onClick={onClearInputHandler}
          className="billing__select-button billing__select-button_close"
        >
          <Close className="billing__select-icon" />
        </button>
        <div className="billing__divider"></div>
        <button
          type="button"
          disabled={
            name === Controller.CITY && watch && !watch(Controller.COUNTRY)
          }
          onClick={onOpenMenuHandler}
          className="billing__select-button"
        >
          <TopBottom className="billing__select-icon" />
        </button>
      </div>
      {menuOpen && (
        <ul className="billing__list" ref={menuRef}>
          {!filteredOptions.length ? (
            <li className="billing__input">No options...</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={`${option.latitude}-${option.value}-${index}`}
                className="billing__item"
                onClick={() => {
                  if (option.code && onSetCountry) {
                    onSetCountry(option.code);
                  }
                  setOptionHandler(option.value);
                }}
              >
                {option.value}
              </li>
            ))
          )}
        </ul>
      )}
      <label htmlFor={name} className="billing__label">
        {label}
      </label>
      {errors[name] && (
        <p role="alert" className="form__error">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};
