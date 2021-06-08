interface Config {
  NODE_ENV: string;
  NAME_KEY: any;
  NAME_TITLE: any;
  DEFAULT_LANGUAGE: any;
  BASE_URL: any;
  API_BASE_URL: any;
  BACKEND_BASE_URL: any;
  SOCKET_URL: any;
}

const config: Config = {
  NODE_ENV: process.env.NODE_ENV,
  NAME_KEY: process.env.REACT_APP_NAME_KEY,
  NAME_TITLE: process.env.REACT_APP_NAME_TITLE,
  DEFAULT_LANGUAGE: process.env.REACT_APP_DEFAULT_LANGUAGE,
  BASE_URL: process.env.REACT_APP_BASE_URL,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  BACKEND_BASE_URL: process.env.REACT_APP_BACKEND_BASE_URL,
  SOCKET_URL: process.env.REACT_APP_SOCKET_URL
};

export default config;
