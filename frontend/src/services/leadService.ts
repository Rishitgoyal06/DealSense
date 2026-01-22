import api, { handleApiResponse } from '@/lib/api';
import { ApiResponse } from '@/types';

export interface Lead {
  _id?: string;
  name: string;
  phone: string;
  requirement: string;
  budget: number;
  leadType: 'buy' | 'rent' | 'sell' | 'club';
  budgetMin?: number;
  budgetMax?: number;
  preferredLocations: string[];
  status: 'active' | 'negotiating' | 'closed' | 'dropped';
  readinessScore: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLeadData {
  name: string;
  phone: string;
  requirement: string;
  budget: number;
  leadType: 'buy' | 'rent' | 'sell' | 'club';
  budgetMin?: number;
  budgetMax?: number;
  preferredLocations: string[];
}

class LeadService {
  async create(leadData: CreateLeadData): Promise<ApiResponse<Lead>> {
    const response = await api.post('/leads', leadData);
    return handleApiResponse<Lead>(response);
  }

  async getAll(): Promise<ApiResponse<Lead[]>> {
    const response = await api.get('/leads');
    return handleApiResponse<Lead[]>(response);
  }

  async getById(id: string): Promise<ApiResponse<Lead>> {
    const response = await api.get(`/leads/${id}`);
    return handleApiResponse<Lead>(response);
  }

  async update(id: string, leadData: Partial<CreateLeadData>): Promise<ApiResponse<Lead>> {
    const response = await api.put(`/leads/${id}`, leadData);
    return handleApiResponse<Lead>(response);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/leads/${id}`);
    return handleApiResponse<void>(response);
  }
}

export const leadService = new LeadService();