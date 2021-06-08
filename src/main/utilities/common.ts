import CryptoJS from 'crypto-js';
import config from '../config';

interface SetStorageParams {
  key: string;
  data: any;
  isNonStringData?: boolean;
}

interface GetStorageParams {
  key: string;
  isNonStringData?: boolean;
}

interface RemoveStorageParams {
  key: string;
}

export const setLocalStorage = (params: SetStorageParams) => {
  let { key, data, isNonStringData } = params;
  if (isNonStringData) {
    data = JSON.stringify(data);
  }
  sessionStorage.setItem(`${config.NAME_KEY}:${key}`, CryptoJS.AES.encrypt(data, `${config.NAME_KEY}-${key}`).toString());
};

export const getLocalStorage = (params: GetStorageParams) => {
  const { key, isNonStringData } = params;

  const ciphertext = sessionStorage.getItem(`${config.NAME_KEY}:${key}`);
  if (ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, `${config.NAME_KEY}-${key}`);
    const storageData = bytes.toString(CryptoJS.enc.Utf8);
    if (isNonStringData) {
      return JSON.parse(storageData);
    }
    return storageData;
  }
  return false;
};

export const removeLocalStorage = (params: RemoveStorageParams) => {
  const { key } = params;

  sessionStorage.removeItem(`${config.NAME_KEY}:${key}`);
  if (['token'].includes(key)) {
    window.location.href = '/';
  }
};

export const getLocalStorageLanguage = () => {
  const language = localStorage.getItem(`${config.NAME_KEY}:language`);
  if (language) {
    return ['en', 'hi'].includes(language) ? language : config.DEFAULT_LANGUAGE;
  }
  return config.DEFAULT_LANGUAGE;
};

export const getBase64OfsvgURL = (srcURL: string) => {
  // https://ourcodeworld.com/articles/read/1072/how-to-convert-a-html-svg-node-to-base64-with-javascript-in-the-browser
  // const img64 = document.createElement('img')
  // img64.src = srcURL
  // const xmlString = new XMLSerializer().serializeToString(img64)
  // console.log('xmlString', xmlString)
  // const encodedData = window.btoa(xmlString)
  // console.log('encodedData', encodedData)
  // return `data:image/svg+xml;base64,${encodedData}`

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = srcURL;
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx: any = canvas.getContext('2d');
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL();
      resolve(dataURL);
    };
    img.onerror = error => reject(error);
  });
};

export const ONLY_NUMBER_REGX = /^[0-9]*$/;

export const checkValIsNumberOnly = (val: any) => {
  return ONLY_NUMBER_REGX.test(val);
};
