import axios, { AxiosRequestConfig } from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/';
export const request = (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  queryParams?: Object | null,
  body?: Object | null,
  headers?: Object,
  isMultipart: boolean = false,
  responseType?: any
) => {
  axios.defaults.withCredentials = true;

  const config: AxiosRequestConfig = {
    headers: {},
  };

  if (headers) {
    config.headers = {
      ...config.headers,
      ...headers,
    };
  }

  if (isMultipart) {
    config.headers = {
      ...config.headers,
      'content-type': 'multipart/form-data',
    };
  }

  if (queryParams) {
    config.params = {
      ...config.params,
      queryParams,
    };
  }

  switch (method) {
    case 'get':
      return axios.get(BASE_URL + url, config);
    case 'post':
      return axios.post(BASE_URL + url, body, config);
    case 'put':
      return axios.put(BASE_URL + url, body, config);
    case 'delete':
      return axios.delete(BASE_URL + url, config);
    default:
      return axios.get(BASE_URL + url, config);
  }
};

axios.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accessToken');
  config.headers.common['Authorization'] = accessToken
    ? `Bearer ${accessToken}`
    : '';
  return config;
});
