import * as Yup from 'yup';
import {
  countryCodeSchema,
  emailSchema,
  mobileSchema
} from './commonSchema';

const signupValidateSchema = Yup.object({
  email: emailSchema,
  mobile: mobileSchema,
  countryCode: countryCodeSchema
});

export default signupValidateSchema;
