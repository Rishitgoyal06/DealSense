import api, { handleApiResponse } from '@/lib/api';
import { ApiResponse } from '@/types';

export interface Interaction {
  _id?: string;
  leadId: string;
  type: 'call' | 'visit' | 'note';
  summary?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateInteractionData {
  leadId: string;
  type: 'call' | 'visit' | 'note';
  summary?: string;
}

class InteractionService {
  async create(interactionData: CreateInteractionData): Promise<ApiResponse<Interaction>> {
    const response = await api.post('/interactions', interactionData);
    return handleApiResponse<Interaction>(response);
  }

  async getByLead(leadId: string): Promise<ApiResponse<Interaction[]>> {
    const response = await api.get(`/interactions/lead/${leadId}`);
    return handleApiResponse<Interaction[]>(response);
  }

  async getAll(): Promise<ApiResponse<Interaction[]>> {
    const response = await api.get('/interactions');
    return handleApiResponse<Interaction[]>(response);
  }
}

export const interactionService = new InteractionService();