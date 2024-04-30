import axios from 'axios';

import settings from '@/settings';

import { HttpMethods } from './constants';

const axiosRequest = async (method: HttpMethods, path: string, data = {}) => {
  // get token from local storage
  const token = localStorage.getItem('token');
  const url = settings.API_URL + 'v1' + path;
  try {
    const response = await axios({
      method,
      url,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
    return response.data;
  } catch (error: any) {
    // Manejo de errores
    console.error('Error en la solicitud:', error);
    if (error.response.status === 401) {
      // redirect to login page
      window.location.href = '/login';
    }
    return null;
  }
};

export default axiosRequest;
