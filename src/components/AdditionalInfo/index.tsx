import React, { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { FormValues } from '@types';

import './AdditionalInfo.scss';

type AdditionalInfoProps = {
  register: UseFormRegister<FormValues>;
};

export const AdditionalInfo: FC<AdditionalInfoProps> = ({ register }) => {
  return (
    <div className="info">
      <h2 className="form__title">Additional informations</h2>
      <p className="form__description">
        Need something else? We will make it for you!
      </p>
      <div className="billing__field info__field">
        <textarea
          id="notes"
          placeholder="Need a specific delivery day? Sending a gitf? Let’s say ..."
          className="billing__input info__input"
          {...register('notes')}
        />
        <p className="billing__label info__label">Order notes</p>
      </div>
    </div>
  );
};
