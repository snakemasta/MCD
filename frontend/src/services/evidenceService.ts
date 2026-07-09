import api from './api';

export const evidenceService = {
  list: (filters?: any) => api.get('/evidence', { params: filters }),
  create: (data: any) => api.post('/evidence', data),
  getById: (id: string) => api.get(`/evidence/${id}`),
  update: (id: string, data: any) => api.put(`/evidence/${id}`, data),
  delete: (id: string) => api.delete(`/evidence/${id}`),
  updateChainOfCustody: (id: string, data: any) =>
    api.post(`/evidence/${id}/custody`, data),
};
