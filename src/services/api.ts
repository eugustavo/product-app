import axios from 'axios';

import { getUserFromStorage } from '@/storage/userStorage';
import { publish } from '@/utils/EventEmitter';
import { AppError } from '@/utils/AppError';

export const api = axios.create({
  baseURL: 'https://app.homolog.clippfacil.com.br/rpc/v1',
});

api.interceptors.request.use(async (config) => {
  const user = await getUserFromStorage();

  if (user) {
    config.headers['authorization-compufacil'] = user.access_token;
  }

  return config;
})

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401 || error.response?.data.error_code === 401) {
      publish('Unauthorized');
      throw new AppError('Sessão expirada, faça login novamente');
    }

    return Promise.reject(error);
  }
);