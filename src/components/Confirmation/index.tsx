import React, { FC, useEffect } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ReactComponent as Check } from '@assets/check.svg';
import { useAppDispatch } from '@hooks';
import { useAppSelector } from '@hooks';
import { selectCartItems } from '@store/cart/selectors';
import { setData } from '@store/cart/slice';
import { FormValues } from '@types';

import './Confirmation.scss';

type ConfirmationProps = {
  register: UseFormRegister<FormValues>;
  watch: (name: string) => boolean;
  errors: FieldErrors<FormValues>;
  isValid: boolean;
};

enum Confirm {
  'SENDING' = 'sending',
  'AGREEMENT' = 'agreement',
}

export const Confirmation: FC<ConfirmationProps> = ({
  register,
  errors,
  watch,
  isValid,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);

  const agreementValue = watch(Confirm.AGREEMENT);
  const sendingValue = watch(Confirm.SENDING);

  useEffect(() => {
    dispatch(setData({ agreement: agreementValue }));
  }, [agreementValue, dispatch]);

  useEffect(() => {
    dispatch(setData({ sending: sendingValue }));
  }, [sendingValue, dispatch]);

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
              autoComplete="do-not-autofill"
              className="confirm__input"
              {...register('sending')}
              defaultChecked={watch(Confirm.SENDING)}
            />
            <span className="confirm__checkbox">
              <Check className="confirm__icon" />
            </span>
            <span>
              I agree with sending an Marketing and newsletter emails. No spam,
              promissed!
            </span>
          </label>
          {errors.sending && (
            <p role="alert" className="form__error">
              {errors.sending.message}
            </p>
          )}
        </div>
        <div className="confirm__field">
          <label htmlFor="agreement" className="confirm__label">
            <input
              id="agreement"
              type="checkbox"
              autoComplete="do-not-autofill"
              className="confirm__input"
              {...register('agreement')}
              defaultChecked={watch(Confirm.AGREEMENT)}
            />
            <span className="confirm__checkbox">
              <Check className="confirm__icon" />
            </span>
            <span>
              I agree with our&nbsp;
              <Link to="/terms" className="confirm__label_underlined">
                terms and conditions
              </Link>
              &nbsp;and&nbsp;
              <Link to="/terms" className="confirm__label_underlined">
                privacy policy
              </Link>
              .
            </span>
          </label>
          {errors.agreement && (
            <p role="alert" className="form__error">
              {errors.agreement.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="form__button"
        disabled={!isValid || Boolean(!items.length)}
      >
        Complete order
      </button>
    </div>
  );
};
