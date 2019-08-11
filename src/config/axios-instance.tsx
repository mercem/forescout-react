import axios from 'axios';
import {baseURL} from './environment';

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const instance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

export const setInterceptors = () => {
  instance.interceptors.request.use( request => {
      if(request.method === 'post') {
        if(!request.data) request.data = {};
        request.data['platform'] = 'WEB';
      } else if(request.method === 'get') {
        if(!request.params) request.params = {};
        request.params['platform'] = 'WEB';
      }
      return request;
    }, error => error
  )

  instance.interceptors.response.use(
    response => response,
    error => {
      return Promise.reject(
        error.response && 
        error.response.data && 
        error.response.data.error_description ?
        {
          ...error.response.data,
          message: error.response.data.error_description
        } : error
      )
    }
  )
};

export default instance;