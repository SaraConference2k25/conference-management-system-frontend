/**
 * Type Definitions for Authentication
 */

// User Roles
export type UserRole = 'participant' | 'evaluator' | 'admin'

// User Information
export interface User {
  id: string
  email: string
  fullName?: string
  role: UserRole
  createdAt?: string
  lastLogin?: string
}

// Authentication Requests
export interface LoginRequest {
  email: string
  password: string
  role: UserRole
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
  affiliation?: string
  role?: UserRole
}

export interface LogoutRequest {
  userId: string
}

// Authentication Responses
export interface LoginResponse {
  user: User
  token: string
  refreshToken?: string
  expiresIn?: number
  message: string
}

export interface RegisterResponse {
  user: User
  message: string
  requiresEmailVerification?: boolean
}

export interface LogoutResponse {
  message: string
}

export interface AuthError {
  code: string
  message: string
  details?: Record<string, any>
}

// Session
export interface Session {
  user: User
  token: string
  expiresAt: number
}

// Form Data
export interface LoginFormData {
  email: string
  password: string
  role: UserRole
  rememberMe: boolean
}

export interface RegisterFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  affiliation?: string
  agreeTerms: boolean
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: AuthError
  message?: string
}
