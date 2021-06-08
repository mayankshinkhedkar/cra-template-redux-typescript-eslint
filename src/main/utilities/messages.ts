import { getLocalStorageLanguage } from './common';
import enValidationMsg from './lang/validation-en';
import hiValidationMsg from './lang/validation-hi';

const textMessages: any = {
  en: enValidationMsg,
  hi: hiValidationMsg
};

const lang = getLocalStorageLanguage();

export default textMessages[lang];
