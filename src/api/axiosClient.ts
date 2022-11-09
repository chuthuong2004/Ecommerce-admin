import axios from 'axios';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL: string | undefined = process.env.REACT_APP_API_URL + '/api/v1/';

let token = JSON.parse(localStorage.getItem('token') as any);
const axiosClient = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${token?.accessToken}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  token = JSON.parse(localStorage.getItem('token') as any);
  config.headers!.Authorization = `Bearer ${token?.accessToken}`;
  config.headers!['x-refresh'] = token?.refreshToken;
  return config;
});
axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    throw error;
  },
);
export default axiosClient;
