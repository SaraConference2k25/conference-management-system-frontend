/**
 * Configuration & Constants for Backend Integration
 */

// User Roles Constants
export const USER_ROLES = {
  PARTICIPANT: 'PARTICIPANT',
  EVALUATOR: 'EVALUATOR',
  ADMIN: 'ADMIN',
} as const

export const API_CONFIG = {
  // Timeout for API requests (in milliseconds)
  REQUEST_TIMEOUT: 30000,
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
    },
    PARTICIPANT: {
      PROFILE: '/participant/profile',
      PAPERS: '/participant/papers',
      SUBMISSIONS: '/participant/submissions',
    },
    EVALUATOR: {
      QUEUE: '/evaluator/queue',
      EVALUATE: '/evaluator/evaluate',
    },
  },
  
  // Error messages
  ERRORS: {
    NETWORK: 'Network error. Please check your connection and try again.',
    TIMEOUT: 'Request timeout. Please try again.',
    UNAUTHORIZED: 'Your session has expired. Please login again.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    EMAIL_EXISTS: 'This email is already registered. Please use a different email.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
  },
  
  // Success messages
  SUCCESS: {
    LOGIN: 'Logged in successfully!',
    REGISTER: 'Account created successfully! Please check your email.',
    LOGOUT: 'Logged out successfully.',
  },
}

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
}
