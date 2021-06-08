import * as Yup from 'yup';
import './custom/phoneValidation';
import { checkValIsNumberOnly } from '../common';

export const emailSchema = Yup.string()
  .email('Email ID is invalid')
  .required('Email ID is required');

export const mobileSchema = Yup.lazy((value) => {
  if (value !== undefined) {
    if (checkValIsNumberOnly(value)) {
      return Yup.string()
        .phoneref(Yup.ref('countryCode'), false, 'Please enter valid mobile number.')
        .required('mobile number is required');
    } else {
      return Yup.string()
        .matches(
          /^[0-9]*$/,
          'Please enter valid mobile number'
        )
        .phoneref(Yup.ref('countryCode'), false, 'Please enter valid mobile number.')
        .required('mobile number is required');
    }
  }
  return Yup.mixed().required('mobile Number is required.');
});

export const firstNameSchema = Yup.string().required('First name is required');

export const lastNameSchema = Yup.string().required('Last name is required');

export const otpSchema = Yup.string().required('OTP is required');

export const countryCodeSchema = Yup.string().required('Country code is required');
