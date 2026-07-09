import api from './api';

export const searchService = {
  global: (query: string, type?: string, filters?: any) =>
    api.get('/search', { params: { q: query, type, ...filters } }),
  investigations: (query: string, filters?: any) =>
    api.get('/search/investigations', { params: { q: query, ...filters } }),
  persons: (query: string, filters?: any) =>
    api.get('/search/persons', { params: { q: query, ...filters } }),
  evidence: (query: string, filters?: any) =>
    api.get('/search/evidence', { params: { q: query, ...filters } }),
  vehicles: (query: string, filters?: any) =>
    api.get('/search/vehicles', { params: { q: query, ...filters } }),
};
