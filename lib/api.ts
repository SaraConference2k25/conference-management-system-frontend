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

export interface PaperSubmissionResponse {
  paperId: string;
  id?: string;
  name: string;
  email: string;
  contactNo: string;
  department: string;
  collegeName: string;
  paperTitle: string;
  paperAbstract: string;
  paperFileName: string;
  paperFileUrl?: string;
  submittedAt?: string;
  evaluatorName?: string;
  status?: string;
  evaluatorComments?: string;
}

export interface PaperSubmitRequest {
  name: string;
  email: string;
  contactNo: string;
  department: string;
  collegeName: string;
  paperTitle: string;
  paperAbstract: string;
  paperFile: File;
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
      body: JSON.stringify({ 
        email, 
        password, 
        role: role.toUpperCase() // Convert role to uppercase for backend compatibility
      }),
    });
  }

  async getUserById(id: string): Promise<AuthResponse> {
    return this.request<AuthResponse>(`/users/${id}`, {
      method: 'GET',
    });
  }

  // Paper Submission endpoints
  async submitPaper(formData: FormData): Promise<PaperSubmissionResponse> {
    const url = `${this.baseURL}/papers/submit`;
    
    const headers: Record<string, string> = {};

    // Add token if it exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData - let the browser handle it

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        const contentType = response.headers.get('content-type');
        
        try {
          if (contentType?.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } else {
            const text = await response.text();
            errorMessage = text || errorMessage;
          }
        } catch (e) {
          // If parsing fails, just use the status
        }
        
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error('Invalid response from server');
      }

      return response.json();
    } catch (error) {
      console.error('Error submitting paper:', error);
      throw error;
    }
  }

  async getPapersByEmail(email: string): Promise<PaperSubmissionResponse[]> {
    return this.request<PaperSubmissionResponse[]>(`/papers/email/${email}`, {
      method: 'GET',
    });
  }

  async getAllPapers(): Promise<PaperSubmissionResponse[]> {
    return this.request<PaperSubmissionResponse[]>('/papers/all', {
      method: 'GET',
    });
  }

  async getPaperById(id: string): Promise<PaperSubmissionResponse> {
    return this.request<PaperSubmissionResponse>(`/papers/${id}`, {
      method: 'GET',
    });
  }

  async getPapersByDepartment(department: string): Promise<PaperSubmissionResponse[]> {
    return this.request<PaperSubmissionResponse[]>(`/papers/department/${department}`, {
      method: 'GET',
    });
  }

  async searchPapers(query: string): Promise<PaperSubmissionResponse[]> {
    return this.request<PaperSubmissionResponse[]>(`/papers/search?query=${query}`, {
      method: 'GET',
    });
  }

  async deletePaper(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/papers/${id}`, {
      method: 'DELETE',
    });
  }

  async updatePaperStatus(paperId: string, status: string): Promise<PaperSubmissionResponse> {
    return this.request<PaperSubmissionResponse>(`/papers/update-status?paperId=${paperId}&status=${status}`, {
      method: 'PATCH',
    });
  }

  async saveReviewComments(paperId: string, evaluatorComments: string, toggleStatus: string): Promise<PaperSubmissionResponse> {
    return this.request<PaperSubmissionResponse>('/papers/save-review-comments', {
      method: 'PATCH',
      body: JSON.stringify({
        paperId,
        evaluatorComments,
        toggleStatus
      }),
    });
  }

  async evaluatePaper(request: any): Promise<PaperSubmissionResponse> {
    try {
      // Use the correct endpoint format consistent with other evaluator methods
      // Assuming request is PaperSubmissionRequest
      const response = await fetch(`${this.baseURL}/admin/evaluators/evaluate-paper`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in evaluatePaper:', error);
      throw error;
    }
  }

  async downloadPaper(id: string): Promise<Blob> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}/papers/download/${id}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to download paper');
    }

    return response.blob();
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

  // ===== EVALUATOR ENDPOINTS =====
  async createEvaluator(evaluatorData: any) {
    try {
      const response = await fetch(`${this.baseURL}/admin/evaluators/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(evaluatorData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating evaluator:', error);
      throw error;
    }
  }

  async getAllEvaluators() {
    try {
      const response = await fetch(`${this.baseURL}/admin/evaluators/all`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching evaluators:', error);
      throw error;
    }
  }

  async getEvaluatorById(evaluatorId: string | number) {
    try {
      const response = await fetch(`${this.baseURL}/admin/evaluators/${evaluatorId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching evaluator:', error);
      throw error;
    }
  }

  async updateEvaluator(evaluatorId: string | number, evaluatorData: any) {
    try {
      const response = await fetch(`${this.baseURL}/admin/evaluators/${evaluatorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(evaluatorData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating evaluator:', error);
      throw error;
    }
  }

  async deleteEvaluator(evaluatorId: string | number) {
    try {
      const response = await fetch(`${this.baseURL}/admin/evaluators/${evaluatorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting evaluator:', error);
      throw error;
    }
  }

  async getEvaluatorStats() {
    try {
      const response = await fetch(`${this.baseURL}/admin/evaluators/stats/summary`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching evaluator stats:', error);
      throw error;
    }
  }

  // ===== ADDITIONAL PAPER ENDPOINTS =====
  async assignEvaluatorToPaper(paperId: string, evaluatorId: string | number) {
    try {
      const response = await fetch(`${this.baseURL}/papers/${paperId}/assign-evaluator/${evaluatorId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        const text = await response.text();
        return { message: text };
      }
    } catch (error) {
      console.error('Error assigning evaluator to paper:', error);
      throw error;
    }
  }
}

export const apiClient = new APIClient(API_BASE_URL);
