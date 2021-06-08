import * as Yup from 'yup';
import { otpSchema } from './commonSchema';

const verifyOtpSchema = Yup.object({
  otp: otpSchema
});

export default verifyOtpSchema;
