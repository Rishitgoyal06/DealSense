import api, { handleApiResponse } from '@/lib/api';
import { ApiResponse } from '@/types';

export interface PaymentSchedule {
  _id?: string;
  leadId: string;
  purpose: string;
  totalAmount?: number;
  emiAmount?: number;
  totalEmis?: number;
  emisPaid: number;
  nextDueDate?: string;
  status: 'on-track' | 'delayed' | 'critical';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePaymentData {
  leadId: string;
  purpose: string;
  totalAmount?: number;
  emiAmount?: number;
  totalEmis?: number;
  nextDueDate?: string;
}

class PaymentService {
  async create(paymentData: CreatePaymentData): Promise<ApiResponse<PaymentSchedule>> {
    const response = await api.post('/payments', paymentData);
    return handleApiResponse<PaymentSchedule>(response);
  }

  async getByLead(leadId: string): Promise<ApiResponse<PaymentSchedule[]>> {
    const response = await api.get(`/payments/lead/${leadId}`);
    return handleApiResponse<PaymentSchedule[]>(response);
  }

  async recordPayment(id: string): Promise<ApiResponse<PaymentSchedule>> {
    const response = await api.patch(`/payments/${id}/pay`);
    return handleApiResponse<PaymentSchedule>(response);
  }

  async getRiskyPayments(): Promise<ApiResponse<PaymentSchedule[]>> {
    const response = await api.get('/payments/risky');
    return handleApiResponse<PaymentSchedule[]>(response);
  }
}

export const paymentService = new PaymentService();