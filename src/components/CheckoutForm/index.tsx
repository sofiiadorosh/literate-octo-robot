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
  } = useForm<FormValues>({
    defaultValues: defaultData,
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

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
        autoComplete="do-not-autofill"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
      >
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
