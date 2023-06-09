import { Country, City } from 'country-state-city';
import React, { FC, useEffect, useState } from 'react';
import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';

import { InputController } from '@components/Controller';
import { Input } from '@components/Input';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectCountry } from '@store/cart/selectors';
import { setCountry } from '@store/cart/slice';
import { FormValues, OptionType } from '@types';

import './BillingInfo.scss';

type BillingInfoProps = {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  watch: (name: string | boolean) => string | boolean;
  errors: FieldErrors<FormValues>;
};

export const BillingInfo: FC<BillingInfoProps> = ({
  register,
  watch,
  errors,
  control,
}) => {
  const dispatch = useAppDispatch();
  const selectedCountry = useAppSelector(selectCountry);

  const [countryValue, setCountryValue] = useState<string>(selectedCountry);
  const [cityOptions, setCityOptions] = useState<[] | OptionType[]>([]);

  const countries = Country.getAllCountries();
  const cities = City.getAllCities();
  const countryOptions = countries.map(country => ({
    label: country.name,
    value: country.name,
    code: country.isoCode,
  }));

  useEffect(() => {
    if (countryValue) {
      setCityOptions([]);
      const citiesByCountry = cities.filter(
        city => city.countryCode === countryValue
      );
      const options = citiesByCountry.map(city => ({
        label: city.name,
        value: city.name,
      }));
      setCityOptions(options);
    }
  }, [countryValue]);

  const setCountryHandler = (selectedOption: string) => {
    setCountryValue(selectedOption);
  };

  useEffect(() => {
    dispatch(setCountry(countryValue));
  }, [countryValue]);

  return (
    <div className="billing">
      <h2 className="form__title">Billing info</h2>
      <p className="form__description">Please enter your billing info</p>
      <div className="billing__info">
        <Input
          name="firstName"
          label="First name*"
          type="text"
          placeholder="First name"
          register={register}
          errors={errors}
          watch={watch}
        />
        <Input
          name="lastName"
          label="Last name"
          type="text"
          placeholder="Last name"
          register={register}
          errors={errors}
          watch={watch}
        />
        <Input
          name="emailName"
          label="Email addess*"
          type="email"
          placeholder="Email addess"
          register={register}
          errors={errors}
          watch={watch}
        />
        <Input
          name="phoneName"
          label="Phone number*"
          type="phone"
          placeholder="Phone number"
          register={register}
          errors={errors}
          watch={watch}
        />
        <InputController
          name="countryName"
          label="State / Country*"
          placeholder="Choose a state or Country"
          options={countryOptions}
          register={register}
          errors={errors}
          onSetCountry={setCountryHandler}
          control={control}
          watch={watch}
        />
        <InputController
          name="cityName"
          label="Town / City"
          placeholder="Town or city"
          options={cityOptions}
          register={register}
          errors={errors}
          watch={watch}
          control={control}
        />
        <Input
          name="apartmentName"
          label="Address*"
          type="text"
          placeholder="Address"
          register={register}
          errors={errors}
          watch={watch}
        />
        <Input
          name="zipName"
          label="ZIP/Postal code*"
          type="text"
          placeholder="Postal code or ZIP"
          register={register}
          errors={errors}
          watch={watch}
        />
      </div>
    </div>
  );
};
