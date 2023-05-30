import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AdditionalInfo } from '@components/AdditionalInfo';
import { BillingInfo } from '@components/BillingInfo';
import { Confirmation } from '@components/Confirmation';
import { FormValues } from '@types';

import './CheckoutForm.scss';

const schema = z.object({
  firstName: z.string().nonempty('This field is required.'),
  lastName: z.string().nonempty('This field is required.'),
  email: z
    .string()
    .nonempty('This field is required')
    .email('Invalid email format.'),
  phone: z.string().nonempty('This field is required.'),
  country: z.string().nonempty('This field is required.'),
  city: z.string().nonempty('This field is required.'),
  apartment: z.string().nonempty('This field is required.'),
  zip: z.string().nonempty('This field is required.'),

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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues,
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
