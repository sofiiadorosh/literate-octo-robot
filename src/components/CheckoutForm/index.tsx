import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AdditionalInfo } from '@components/AdditionalInfo';
import { BillingInfo } from '@components/BillingInfo';
import { Confirmation } from '@components/Confirmation';
import { useAppSelector } from '@hooks';
import { selectData } from '@store/cart/selectors';
import { FormValues } from '@types';

import './CheckoutForm.scss';

const schema = z.object({
  firstName: z.string().nonempty('This field is required.'),
  lastName: z.string().optional(),
  email: z
    .string()
    .nonempty('This field is required')
    .email('Invalid email format.'),
  phone: z
    .string()
    .nonempty('This field is required.')
    .min(5, 'Phone number must contain at least 5 numbers.')
    .max(12, 'Phone number must contain at most 12 numbers.'),
  country: z.string().nonempty('This field is required.'),
  city: z.string().optional(),
  apartment: z.string().nonempty('This field is required.'),
  zip: z
    .string()
    .nonempty('This field is required.')
    .min(5, 'Zip code must contain at least 5 characters.')
    .max(10, 'Zip code must contain at most 12 characters.'),

  notes: z.string().optional(),
  sending: z.boolean().refine(value => value, {
    message: 'This field must be checked.',
  }),
  agreement: z.boolean().refine(value => value, {
    message: 'This field must be checked.',
  }),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  apartment: '',
  city: '',
  country: '',
  zip: '',
  notes: '',
  sending: false,
  agreement: false,
};

export const CheckoutForm: FC = () => {
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
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler = (data: FormValues) => {
    console.log('form submitted', data);
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
