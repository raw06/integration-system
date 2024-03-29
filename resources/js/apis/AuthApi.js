import { getToken } from '../utils/auth';
import instanceAxios from './base';

class AuthApi {
  static async getUser() {
    const token = getToken();
    const response = await instanceAxios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async login(data) {
    const token = getToken();
    const response = await instanceAxios.post('api/auth/login', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async register(data) {
    const response = await instanceAxios.post('api/auth/register', data);
    return response.data;
  }

  static async logout() {
    const token = getToken();
    const response = await instanceAxios.post('api/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async forgot(data) {
    const response = await instanceAxios.post('api/reset-password', data);
    return response.data;
  }

  static async reset(data, token) {
    const response = await instanceAxios.put(`api/reset-password/${token}`, data);
    return response.data;
  }
}
export default AuthApi;
