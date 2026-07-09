import api from './api';

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data),
  refreshToken: () => api.post('/auth/refresh', {}),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};
