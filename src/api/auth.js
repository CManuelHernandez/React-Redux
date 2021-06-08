import client, { configureClient, resetClient } from './client';
import storage from '../utils/storage';

const authPath = '/api/auth';

export const login = ({ remember, ...credentials }) => {
  return client
    .post(`${authPath}/login`, credentials)
    .then(({ accessToken }) => {
      configureClient({ accessToken });
      return accessToken;
    })
    .then(accessToken => {
      if (remember) {
        storage.set('auth', accessToken);
      }
    });
};

export const logout = () => {
  return Promise.resolve().then(resetClient).then(storage.clear);
};
