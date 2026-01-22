import api, { handleApiResponse } from '@/lib/api';
import { ApiResponse } from '@/types';

export interface FollowUp {
  _id?: string;
  leadId: string;
  scheduledFor: string;
  status: 'pending' | 'completed';
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFollowUpData {
  leadId: string;
  scheduledFor: string;
  note?: string;
}

class FollowUpService {
  async create(followUpData: CreateFollowUpData): Promise<ApiResponse<FollowUp>> {
    const response = await api.post('/followups', followUpData);
    return handleApiResponse<FollowUp>(response);
  }

  async getAll(): Promise<ApiResponse<FollowUp[]>> {
    const response = await api.get('/followups');
    return handleApiResponse<FollowUp[]>(response);
  }

  async getByLead(leadId: string): Promise<ApiResponse<FollowUp[]>> {
    const response = await api.get(`/followups/lead/${leadId}`);
    return handleApiResponse<FollowUp[]>(response);
  }

  async getTodaysFollowUps(): Promise<ApiResponse<FollowUp[]>> {
    const response = await api.get('/followups/today');
    return handleApiResponse<FollowUp[]>(response);
  }

  async complete(id: string): Promise<ApiResponse<FollowUp>> {
    const response = await api.patch(`/followups/${id}/complete`);
    return handleApiResponse<FollowUp>(response);
  }
}

export const followUpService = new FollowUpService();