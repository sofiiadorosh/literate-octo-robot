import React, { FC, useEffect } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@hooks';
import { selectFormErrors } from '@store/cart/selectors';
import { setData, setErrors } from '@store/cart/slice';
import { FormValues } from '@types';

type InputProps = {
  name: keyof FormValues;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: (name: string | boolean) => string | boolean;
};

export const Input: FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  register,
  errors,
  watch,
}) => {
  const dispatch = useAppDispatch();
  const formError = useAppSelector(selectFormErrors);

  const value = watch(name);

  useEffect(() => {
    dispatch(setData({ [name]: value }));
  }, [value, dispatch]);

  useEffect(() => {
    if (errors[name]) {
      dispatch(setErrors({ [name]: errors[name]?.message }));
    }
  }, [value, dispatch]);

  return (
    <div className="billing__field">
      <input
        id={name}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        className="billing__input"
        {...register(name)}
      />
      <label htmlFor={name} className="billing__label">
        {label}
      </label>
      {Boolean(formError[name]?.length) && (
        <p role="alert" className="form__error">
          {formError[name]}
        </p>
      )}
    </div>
  );
};
