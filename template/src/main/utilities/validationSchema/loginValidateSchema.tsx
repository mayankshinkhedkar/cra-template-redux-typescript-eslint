import * as Yup from 'yup';
import { countryCodeSchema, mobileSchema } from './commonSchema';

const loginValidateSchema = Yup.object({
  mobile: mobileSchema,
  countryCode: countryCodeSchema
});

export default loginValidateSchema;
