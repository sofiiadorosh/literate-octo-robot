import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { AdditionalInfo } from '@components/AdditionalInfo';
import { BillingInfo } from '@components/BillingInfo';
import { Confirmation } from '@components/Confirmation';
import { useAppSelector, useAppDispatch } from '@hooks';
import { schema } from '@schemas';
import { selectData } from '@store/cart/selectors';
import { clearCart } from '@store/cart/slice';
import { setFormSubmitted } from '@store/cart/slice';
import { FormValues } from '@types';

import './CheckoutForm.scss';

const defaultValues = {
  firstName: '',
  lastName: '',
  emailName: '',
  phoneName: '',
  apartmentName: '',
  cityName: '',
  countryName: '',
  zipName: '',
  notes: '',
  sending: false,
  agreement: false,
};

export const CheckoutForm: FC = () => {
  const dispatch = useAppDispatch();
  const defaultData = useAppSelector(selectData);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    watch,
    reset,
    trigger,
  } = useForm<FormValues>({
    defaultValues: defaultData,
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const touchedFields = Object.entries(defaultData)
      .map(([name, value]) => {
        if (typeof value === 'string' && value.length) {
          return name;
        }
        return undefined;
      })
      .filter(Boolean) as (keyof FormValues)[];

    trigger(touchedFields);
  }, [defaultData]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);

      dispatch(setFormSubmitted(true));
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler = (data: FormValues) => {
    console.log(data);
    dispatch(clearCart());
  };

  return (
    <>
      <h1 className="form__heading">Form</h1>
      <form
        className="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          style={{ display: 'none' }}
        />
        <BillingInfo
          register={register}
          watch={watch}
          errors={errors}
          control={control}
        />
        <AdditionalInfo register={register} />
        <Confirmation
          register={register}
          watch={watch}
          errors={errors}
          isValid={isValid}
        />
      </form>
      <DevTool control={control} />
    </>
  );
};
