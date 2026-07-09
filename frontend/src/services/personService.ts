import api from './api';

export const personService = {
  search: (query: string, filters?: any) =>
    api.get('/persons', { params: { q: query, ...filters } }),
  create: (data: any) => api.post('/persons', data),
  getById: (id: string) => api.get(`/persons/${id}`),
  update: (id: string, data: any) => api.put(`/persons/${id}`, data),
  delete: (id: string) => api.delete(`/persons/${id}`),
  merge: (primaryId: string, secondaryId: string) =>
    api.post(`/persons/${primaryId}/merge`, { secondary_id: secondaryId }),
  getRelatedInvestigations: (id: string) =>
    api.get(`/persons/${id}/investigations`),
};
