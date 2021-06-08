import config from '../config';

const logger = (...arg: any[]) => {
  if (config.NODE_ENV !== 'production') {
    console.log('----START----');
    console.log(arg);
    console.log('----END----');
  }
  return false;
};

export default logger;
