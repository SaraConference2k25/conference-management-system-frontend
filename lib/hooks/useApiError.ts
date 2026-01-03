/**
 * Custom Hook for API Error Handling
 * Provides formatted error messages for UI display
 */

import { useState } from 'react'

export interface ApiError {
  message: string
  status?: number
  details?: any
}

export function useApiError() {
  const [error, setError] = useState<ApiError | null>(null)
  const [isError, setIsError] = useState(false)

  const handleError = (err: any): ApiError => {
    let apiError: ApiError = {
      message: 'An unexpected error occurred',
    }

    if (err?.status) {
      apiError.status = err.status
    }

    if (err?.data?.message) {
      apiError.message = err.data.message
      apiError.details = err.data
    } else if (err?.message) {
      apiError.message = err.message
    }

    // Status-specific error messages
    if (apiError.status === 401) {
      apiError.message = 'Unauthorized. Please log in again.'
    } else if (apiError.status === 403) {
      apiError.message = 'You do not have permission to perform this action.'
    } else if (apiError.status === 404) {
      apiError.message = 'Resource not found.'
    } else if (apiError.status === 409) {
      apiError.message = 'Email already registered. Please use a different email or login.'
    } else if (apiError.status && apiError.status >= 500) {
      apiError.message = 'Server error. Please try again later.'
    }

    setError(apiError)
    setIsError(true)

    return apiError
  }

  const clearError = () => {
    setError(null)
    setIsError(false)
  }

  return {
    error,
    isError,
    handleError,
    clearError,
  }
}
