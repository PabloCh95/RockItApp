import { AxiosError } from 'axios';

export const retryStrategies = {
 
  networkOnly: (error: AxiosError): boolean => {
    return !error.response && error.code === 'NETWORK_ERROR';
  },


  serverErrors: (error: AxiosError): boolean => {
    if (!error.response) return true; 
    return error.response.status >= 500;
  },

  clientAndServerErrors: (error: AxiosError): boolean => {
    if (!error.response) return true;
    const status = error.response.status;
    return (status >= 400 && status < 500 && status !== 401 && status !== 403) || status >= 500;
  },

  allExceptAuth: (error: AxiosError): boolean => {
    if (!error.response) return true;
    const status = error.response.status;
    return status !== 401 && status !== 403 && status !== 404;
  },
};

export const retryConfigs = {
  default: {
    retries: 3,
    retryDelay: 1000,
    retryCondition: retryStrategies.networkOnly,
  },
  aggressive: {
    retries: 5,
    retryDelay: 500,
    retryCondition: retryStrategies.allExceptAuth,
  },
  conservative: {
    retries: 2,
    retryDelay: 2000,
    retryCondition: retryStrategies.serverErrors,
  },
};