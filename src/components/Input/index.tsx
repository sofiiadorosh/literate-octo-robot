import React, { FC } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { FormValues } from '@types';

type InputProps = {
  name: keyof FormValues;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
};

export const Input: FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  register,
  errors,
}) => {
  return (
    <div className="billing__field">
      <input
        id={name}
        type={type}
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
