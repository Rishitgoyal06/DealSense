import api, { handleApiResponse } from '@/lib/api';
import { ApiResponse } from '@/types';

export interface Quotation {
  _id?: string;
  leadId: string;
  brokerName: string;
  propertySummary?: string;
  quotedPrice: number;
  sharedWithCustomer: boolean;
  customerResponse: 'interested' | 'no_response' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateQuotationData {
  leadId: string;
  brokerName: string;
  propertySummary?: string;
  quotedPrice: number;
}

class QuotationService {
  async create(quotationData: CreateQuotationData): Promise<ApiResponse<Quotation>> {
    const response = await api.post('/quotations', quotationData);
    return handleApiResponse<Quotation>(response);
  }

  async getAll(): Promise<ApiResponse<Quotation[]>> {
    const response = await api.get('/quotations');
    return handleApiResponse<Quotation[]>(response);
  }

  async getByLead(leadId: string): Promise<ApiResponse<Quotation[]>> {
    const response = await api.get(`/quotations/lead/${leadId}`);
    return handleApiResponse<Quotation[]>(response);
  }

  async updateResponse(id: string, customerResponse: string): Promise<ApiResponse<Quotation>> {
    const response = await api.patch(`/quotations/${id}/response`, { customerResponse });
    return handleApiResponse<Quotation>(response);
  }

  async markShared(id: string): Promise<ApiResponse<Quotation>> {
    const response = await api.patch(`/quotations/${id}/shared`);
    return handleApiResponse<Quotation>(response);
  }
}

export const quotationService = new QuotationService();