import React, { FC } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { ReactComponent as Check } from '@assets/check.svg';
import { FormValues } from '@types';

import './Confirmation.scss';

type ConfirmationProps = {
  register: UseFormRegister<FormValues>;
  watch: (name: string) => boolean;
  errors: FieldErrors<FormValues>;
  isValid: boolean;
};

export const Confirmation: FC<ConfirmationProps> = ({
  register,
  errors,
  watch,
  isValid,
}) => {
  return (
    <div className="confirm">
      <h2 className="form__title">Confirmation</h2>
      <p className="form__description">
        We are getting to the end. Just few clicks and your order si ready!
      </p>
      <div className="confirm__info">
        <div className="confirm__field">
          <label htmlFor="sending" className="confirm__label">
            <input
              id="sending"
              type="checkbox"
              className="confirm__input"
              {...register('confirmation.sending')}
              defaultChecked={watch('confirmation.sending')}
            />
            <span className="confirm__checkbox">
              <Check className="confirm__icon" />
            </span>
            <span>
              I agree with sending an Marketing and newsletter emails. No spam,
              promissed!
            </span>
          </label>
          {errors.confirmation && errors.confirmation.sending && (
            <p role="alert" className="form__error">
              {errors.confirmation.sending.message}
            </p>
          )}
        </div>
        <div className="confirm__field">
          <label htmlFor="agreement" className="confirm__label">
            <input
              id="agreement"
              type="checkbox"
              className="confirm__input"
              {...register('confirmation.agreement')}
              defaultChecked={watch('confirmation.agreement')}
            />
            <span className="confirm__checkbox">
              <Check className="confirm__icon" />
            </span>
            <span>
              I agree with our&nbsp;
              <span className="confirm__label_underlined">
                terms and conditions
              </span>
              &nbsp;and&nbsp;
              <span className="confirm__label_underlined">privacy policy</span>.
            </span>
          </label>
          {errors.confirmation && errors.confirmation.agreement && (
            <p role="alert" className="form__error">
              {errors.confirmation.agreement.message}
            </p>
          )}
        </div>
      </div>
      <button type="submit" className="form__button" disabled={!isValid}>
        Complete order
      </button>
    </div>
  );
};
