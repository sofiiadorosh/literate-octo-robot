import React, { FC, useEffect } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { useAppDispatch } from '@hooks';
import { setData } from '@store/cart/slice';
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

  const value = watch(name);

  useEffect(() => {
    dispatch(setData({ [name]: value }));
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
      {errors[name] && (
        <p role="alert" className="form__error">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};
