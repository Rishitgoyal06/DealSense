// User types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Lead types
export type LeadType = 'buy' | 'rent' | 'sell' | 'club';
export type LeadStatus = 'active' | 'negotiating' | 'closed' | 'dropped';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  leadType: LeadType;
  budgetMin?: number;
  budgetMax?: number;
  preferredLocations: string[];
  status: LeadStatus;
  readinessScore: number;
  createdAt: string;
  updatedAt: string;
}

// Follow-up types
export type FollowUpStatus = 'pending' | 'completed';

export interface FollowUp {
  id: string;
  leadId: string;
  scheduledFor: string;
  status: FollowUpStatus;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// Quotation types
export type CustomerResponse = 'interested' | 'no_response' | 'rejected';

export interface Quotation {
  id: string;
  leadId: string;
  brokerName: string;
  propertySummary?: string;
  quotedPrice: number;
  sharedWithCustomer: boolean;
  customerResponse?: CustomerResponse;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  leadType: LeadType;
  budgetMin?: number;
  budgetMax?: number;
  preferredLocations: string[];
}

// Dashboard types
export interface DashboardStats {
  totalLeads: number;
  activeLeads: number;
  todayFollowUps: number;
  dealsClosed: number;
}

// Auth Context types
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
