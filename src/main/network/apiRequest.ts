import axios from 'axios';
import {
  getLocalStorage,
  removeLocalStorage,
  getLocalStorageLanguage
} from '../utilities/common';
import config from '../config';
import momentTimezone from 'moment-timezone';
import logger from '../utilities/logger';

interface Cancel {
  message: string;
}

interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}

export interface AxiosConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: any;
  url?: string;
  baseURL?: string;
  queryParams?: any;
  bodyData?: any;
  cancelFunction?: any;
  formHeaders?: any;
  removeHeaders?: any;
  params?: any;
  data?: any;
  cancelToken?: CancelToken;
}
const APIrequest = async (args: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url?: any;
  baseURL?: any;
  queryParams?: any;
  bodyData?: any;
  cancelFunction?: any;
  formHeaders?: any;
  removeHeaders?: any;
}) => {
  const {
    method,
    url,
    baseURL,
    queryParams,
    bodyData,
    cancelFunction,
    formHeaders,
    removeHeaders
  } = args;

  const apiToken = getLocalStorage({ key: 'token' });
  const language = getLocalStorageLanguage();

  try {
    const axiosConfig: AxiosConfig = {
      method: method || 'GET',
      baseURL: config.API_BASE_URL,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        timezone: momentTimezone.tz.guess(true),
        language
      }
    };

    if (formHeaders) {
      axiosConfig.headers = Object.assign({}, axiosConfig.headers, formHeaders);
    }

    if (baseURL) {
      axiosConfig.baseURL = baseURL;
    }

    if (url) {
      axiosConfig.url = url;
    }

    if (queryParams) {
      const queryParamsPayload: any = {};
      for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
          let element = queryParams[key];
          if (typeof element === 'string') {
            element = element.trim();
          }
          if (!['', null, undefined, NaN].includes(element)) {
            queryParamsPayload[key] = element;
          }
        }
      }
      axiosConfig.params = queryParamsPayload;
    }

    if (bodyData) {
      const bodyPayload: any = {};
      for (const key in bodyData) {
        if (Object.hasOwnProperty.call(bodyData, key)) {
          let element = bodyData[key];
          if (typeof element === 'string') {
            element = element.trim();
          }
          if (!['', null, undefined, NaN].includes(element)) {
            bodyPayload[key] = element;
          }
        }
      }
      axiosConfig.data = bodyPayload;
    }

    if (cancelFunction) {
      axiosConfig.cancelToken = new axios.CancelToken((cancel) => {
        cancelFunction(cancel);
      });
    }

    if (removeHeaders) {
      delete axiosConfig.headers;
    }

    if (apiToken) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        Authorization: `Bearer ${apiToken}`
      };
    }

    logger(axiosConfig);

    const res = await axios(axiosConfig);
    return res.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      logger('API canceled', error);
      throw new Error(error);
    } else {
      const errorRes: any = error.response;
      logger('Error in the api request', errorRes);
      if (
        'error' in errorRes.data &&
        Object.keys(errorRes.data.error).length &&
        [400, 401].includes(errorRes.data.error.status)
      ) {
        removeLocalStorage({ key: 'token' });
      }
      throw new Error(errorRes.data.message);
    }
  }
};

export default APIrequest;
