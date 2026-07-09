import api from './api';

export interface Investigation {
  id: string;
  case_number: string;
  title: string;
  status: 'active' | 'cold' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
  assigned_to?: string;
  supervisor_id?: string;
  created_at: string;
  updated_at: string;
}

export const investigationService = {
  list: (filters?: any) => api.get('/investigations', { params: filters }),
  create: (data: any) => api.post('/investigations', data),
  getById: (id: string) => api.get(`/investigations/${id}`),
  update: (id: string, data: any) => api.put(`/investigations/${id}`, data),
  delete: (id: string) => api.delete(`/investigations/${id}`),
  linkInvestigations: (id: string, linkedId: string) =>
    api.post(`/investigations/${id}/link`, { linked_investigation_id: linkedId }),
  mergeInvestigations: (id: string, mergeId: string) =>
    api.post(`/investigations/${id}/merge`, { merge_investigation_id: mergeId }),
  getTimeline: (id: string) => api.get(`/investigations/${id}/timeline`),
  getTasks: (id: string) => api.get(`/investigations/${id}/tasks`),
};
