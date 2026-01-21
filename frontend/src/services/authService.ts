import api, { handleApiResponse } from '@/lib/api';
import { User, LoginFormData, RegisterFormData, ApiResponse } from '@/types';

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginFormData): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post('/auth/login', credentials);
    const result = handleApiResponse<AuthResponse>(response);
    
    if (result.success && result.data.token) {
      localStorage.setItem('token', result.data.token);
    }
    
    return result;
  }

  async register(userData: RegisterFormData): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post('/auth/register', userData);
    const result = handleApiResponse<AuthResponse>(response);
    
    if (result.success && result.data.token) {
      localStorage.setItem('token', result.data.token);
    }
    
    return result;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}

export const authService = new AuthService();
