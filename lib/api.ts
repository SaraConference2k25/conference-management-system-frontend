/**
 * API Configuration and Client
 * Centralized API service for all backend communication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8069/api';

export interface AuthRequest {
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  fullName?: string;
  role: string;
  token?: string;
  message?: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
  token: string;
  message: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  affiliation?: string;
  role?: string;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    // Add token if it exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');
      
      if (!response.ok) {
        let errorData: any = {};
        if (isJson) {
          errorData = await response.json();
        } else {
          errorData = { message: await response.text() };
        }
        
        const error = new Error(
          errorData.message || errorData.error || `HTTP ${response.status}`
        );
        (error as any).status = response.status;
        (error as any).data = errorData;
        throw error;
      }

      if (!isJson) {
        return { message: await response.text() } as T;
      }

      return response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(
    email: string,
    password: string,
    role: string
  ): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  isAuthenticated(): boolean {
    return this.getAuthToken() !== null;
  }
}

export const apiClient = new APIClient(API_BASE_URL);
