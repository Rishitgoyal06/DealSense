import api from '@/lib/api';

export const leadService = {
  getAll: async () => {
    const response = await api.get('/leads');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },

  create: async (leadData: any) => {
    const response = await api.post('/leads', leadData);
    return response.data;
  },

  update: async (id: string, leadData: any) => {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/leads/${id}/status`, { status });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },
};
