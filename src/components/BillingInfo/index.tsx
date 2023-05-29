import { Country, City } from 'country-state-city';
import React, { FC, useEffect, useState } from 'react';
import {
  UseFormRegister,
  FieldErrors,
  Controller,
  Control,
} from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';

import { FormValues } from '@types';

import './BillingInfo.scss';

type BillingInfoProps = {
  register: UseFormRegister<FormValues>;
  watch: (name: string) => string;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues>;
};

type OptionType = {
  label: string;
  value: string;
  code?: string;
};

export const BillingInfo: FC<BillingInfoProps> = ({
  register,
  watch,
  errors,
  control,
}) => {
  const [countryValue, setCountryValue] = useState<string | null>(null);
  const [cityOptions, setCityOptions] = useState<
    [] | { label: string; value: string }[]
  >([]);

  const countries = Country.getAllCountries();
  const countryOptions = countries.map(country => ({
    label: country.name,
    value: country.name,
    code: country.isoCode,
  }));
  const allCities = City.getAllCities();

  const selectStyles: StylesConfig<OptionType, false> = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      height: 44,
      padding: '11px 16px 12px 21px',
      backgroundColor: '#f9f9f9',
      borderRadius: 12,
      border: state.menuIsOpen ? '1px solid #6a983c' : '1px solid #d1d1d1',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #6a983c',
      },
    }),
    valueContainer: baseStyles => ({
      ...baseStyles,
      display: 'flex',
      alignItems: 'center',
      margin: 0,
      padding: 0,
    }),
    placeholder: baseStyles => ({
      ...baseStyles,
      margin: 0,
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.36,
      color: '#a9a9a9',
    }),
    input: baseStyles => ({
      ...baseStyles,
      margin: 0,
      padding: 0,
    }),
    menu: baseStyles => ({
      ...baseStyles,
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.36,
      border: '1px solid #6a983c',
      borderRadius: 4,
      overflow: 'hidden',
    }),
    menuList: baseStyles => ({
      ...baseStyles,
      backgroundColor: '#f4f8ec',
    }),
    indicatorsContainer: baseStyles => ({
      ...baseStyles,
      width: 20,
      height: 20,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#6a983c'
        : state.isFocused
        ? '#d1d1d1'
        : 'transparent',
      color: state.isSelected ? '#ffffff' : 'inherit',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? '#6a983c' : '#d1d1d1',
        color: state.isSelected ? '#ffffff' : 'inherit',
      },
    }),
    singleValue: provided => ({
      ...provided,
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.36,
      color: 'inherit',
    }),
  };

  useEffect(() => {
    if (countryValue) {
      const cities = allCities.filter(
        city => city.countryCode === countryValue
      );
      const options = cities.map(city => ({
        label: city.name,
        value: city.name,
      }));
      setCityOptions(options);
    }
  }, [countryValue]);

  return (
    <div className="billing">
      <h1 className="form__title">Billing info</h1>
      <p className="form__description">Please enter your billing info</p>
      <div className="billing__info">
        <div className="billing__field">
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            className="billing__input"
            {...register('firstName')}
          />
          <label htmlFor="firstName" className="billing__label">
            First name
          </label>
          {errors.firstName && (
            <p role="alert" className="form__error">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="billing__field">
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            className="billing__input"
            {...register('lastName')}
          />
          <label htmlFor="lastName" className="billing__label">
            Last name
          </label>
          {errors.lastName && (
            <p role="alert" className="form__error">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="billing__field">
          <input
            id="email"
            type="email"
            placeholder="Email address"
            className="billing__input"
            {...register('email')}
          />
          <label htmlFor="email" className="billing__label">
            Email address
          </label>
          {errors.email && (
            <p role="alert" className="form__error">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="billing__field">
          <input
            id="phone"
            type="tel"
            placeholder="Phone number"
            className="billing__input"
            {...register('phone')}
          />
          <label htmlFor="phone" className="billing__label">
            Phone number
          </label>
          {errors.phone && (
            <p role="alert" className="form__error">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="billing__field">
          <Controller
            name="address.country"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                classNamePrefix="select"
                styles={selectStyles}
                placeholder="Choose a state or Country"
                options={countryOptions}
                value={countryOptions.find(country => country.value === value)}
                onChange={selectedOption => {
                  if (selectedOption && selectedOption.code) {
                    setCountryValue(selectedOption.code);
                  }
                  onChange(selectedOption?.value);
                }}
              />
            )}
          />
          <label htmlFor="country" className="billing__label">
            State / Country
          </label>
          {errors.address && errors.address.country && (
            <p role="alert" className="form__error">
              {errors.address.country.message}
            </p>
          )}
        </div>
        <div className="billing__field">
          <Controller
            name="address.town"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                classNamePrefix="select"
                styles={selectStyles}
                isDisabled={!watch('address.country')}
                placeholder="Town or city"
                options={cityOptions}
                value={cityOptions.find(city => city.value === value)}
                onChange={selectedOption => {
                  onChange(selectedOption?.value);
                }}
              />
            )}
          />
          <label htmlFor="town" className="billing__label">
            Town / City
          </label>
          {errors.address && errors.address.town && (
            <p role="alert" className="form__error">
              {errors.address.town.message}
            </p>
          )}
        </div>
        <div className="billing__field">
          <input
            id="address"
            type="text"
            placeholder="Address"
            className="billing__input"
            {...register('address.apartment')}
          />
          <label htmlFor="address" className="billing__label">
            Address
          </label>
          {errors.address && errors.address.apartment && (
            <p role="alert" className="form__error">
              {errors.address.apartment.message}
            </p>
          )}
        </div>
        <div className="billing__field">
          <input
            id="zip"
            type="text"
            placeholder="Postal code or ZIP"
            className="billing__input"
            {...register('address.zip')}
          />
          <label htmlFor="zip" className="billing__label">
            ZIP/Postal code
          </label>
          {errors.address && errors.address.zip && (
            <p role="alert" className="form__error">
              {errors.address.zip.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
