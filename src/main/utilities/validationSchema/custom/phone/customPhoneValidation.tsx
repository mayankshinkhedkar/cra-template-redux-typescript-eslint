import * as Yup from 'yup';
import gPhoneNumber from 'google-libphonenumber';

const phoneUtil = gPhoneNumber.PhoneNumberUtil.getInstance();

declare module 'yup' {
  export interface StringSchema {
    /**
     * Check for phone number validity.
     *
     * @param {String} [countryCode=IN] The country code to check against.
     * @param {Boolean} [strict=false] How strictly should it check.
     * @param {String} [errorMessage=DEFAULT_MESSAGE] The error message to return if the validation fails.
     */
    phoneref(
      countryCode?: any, // M$
      strict?: boolean,
      errorMessage?: string
    ): StringSchema;
  }
}

const YUP_PHONE_METHOD = 'phoneref';
const CLDR_REGION_CODE_SIZE = 2;

const isValidCountryCode = (countryCode: any): boolean =>
  typeof countryCode === 'string' &&
  countryCode.length === CLDR_REGION_CODE_SIZE;

Yup.addMethod(Yup.string, YUP_PHONE_METHOD, function yupPhoneRef (
  countryCode?: any, // M$
  strict: boolean = false,
  errorMessage: string = ''
) {
  const errMsg =
    typeof errorMessage === 'string' && errorMessage
      ? errorMessage
      : isValidCountryCode(countryCode)
        ? `\${path} must be a valid phone number for region ${countryCode}`
        : 'Must be a valid phone number';
  // @ts-ignore
  return this.test(YUP_PHONE_METHOD, errMsg, function (value: string) {
    countryCode = this.resolve(countryCode); // M$

    if (!isValidCountryCode(countryCode)) {
      // if not valid countryCode, then set default country to India (IN)
      countryCode = 'IN';
      strict = false;
    }

    try {
      const mobile = phoneUtil.parseAndKeepRawInput(value, countryCode);

      if (!phoneUtil.isPossibleNumber(mobile)) {
        return false;
      }

      const regionCodeFromPhoneNumber = phoneUtil.getRegionCodeForNumber(
        mobile
      );

      /* check if the countryCode provided should be used as
       default country code or strictly followed
     */
      return strict
        ? phoneUtil.isValidNumberForRegion(mobile, countryCode)
        : phoneUtil.isValidNumberForRegion(
          mobile,
          regionCodeFromPhoneNumber
        );
    } catch {
      return false;
    }
  });
});
