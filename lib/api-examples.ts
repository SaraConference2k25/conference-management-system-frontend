/**
 * Example: API Request Patterns for Participant Role
 * 
 * This file shows how to extend the API client for participant-specific endpoints
 * Copy and adapt these patterns for your specific needs
 */

import { apiClient } from './api'

// ============================================================
// Example 1: Extending API Client with Participant Methods
// ============================================================

export interface Paper {
  id: string
  title: string
  abstract: string
  authors: string[]
  status: 'draft' | 'submitted' | 'accepted' | 'rejected'
  submissionDate: string
}

export interface PaperSubmission {
  title: string
  abstract: string
  authors: string[]
  keywords: string[]
  file: File
}

/**
 * Extend API client with participant endpoints
 * Add these methods to lib/api.ts
 */
class ParticipantAPI {
  // Get user's papers
  async getUserPapers(): Promise<Paper[]> {
    // Implementation example:
    // return fetch with auth token
    // const response = await fetch(
    //   `${API_BASE_URL}/participant/papers`,
    //   { headers: { Authorization: `Bearer ${apiClient.getAuthToken()}` } }
    // )
    // return response.json()
    throw new Error('Not implemented')
  }

  // Submit a paper
  async submitPaper(data: PaperSubmission): Promise<Paper> {
    throw new Error('Not implemented')
  }

  // Get paper details
  async getPaperDetails(paperId: string): Promise<Paper> {
    throw new Error('Not implemented')
  }

  // Update paper
  async updatePaper(paperId: string, data: Partial<PaperSubmission>): Promise<Paper> {
    throw new Error('Not implemented')
  }

  // Delete paper
  async deletePaper(paperId: string): Promise<void> {
    throw new Error('Not implemented')
  }
}

// ============================================================
// Example 2: Custom Hook for Participant Data
// ============================================================

import { useState, useEffect } from 'react'

export function usePapers() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPapers = async () => {
      setIsLoading(true)
      try {
        // const data = await participantAPI.getUserPapers()
        // setPapers(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPapers()
  }, [])

  return { papers, isLoading, error }
}

// ============================================================
// Example 3: Component Using Protected API Call
// ============================================================

/**
 * Example component that fetches and displays participant papers
 * 
 * 'use client'
 * import { useAuth } from '@/lib/auth-context'
 * import { useEffect, useState } from 'react'
 * 
 * export default function MyPapersPage() {
 *   const { user } = useAuth()
 *   const [papers, setPapers] = useState<Paper[]>([])
 *   const [isLoading, setIsLoading] = useState(true)
 *   const [error, setError] = useState('')
 * 
 *   useEffect(() => {
 *     if (!user) return
 * 
 *     const fetchPapers = async () => {
 *       try {
 *         setIsLoading(true)
 *         // const response = await fetch(
 *         //   `${process.env.NEXT_PUBLIC_API_URL}/participant/papers`,
 *         //   {
 *         //     headers: {
 *         //       Authorization: `Bearer ${localStorage.getItem('auth_token')}`
 *         //     }
 *         //   }
 *         // )
 *         // const data = await response.json()
 *         // setPapers(data)
 *       } catch (err: any) {
 *         setError(err.message)
 *       } finally {
 *         setIsLoading(false)
 *       }
 *     }
 * 
 *     fetchPapers()
 *   }, [user])
 * 
 *   if (isLoading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error}</div>
 * 
 *   return (
 *     <div>
 *       <h1>My Papers ({papers.length})</h1>
 *       {papers.map((paper) => (
 *         <div key={paper.id}>
 *           <h3>{paper.title}</h3>
 *           <p>Status: {paper.status}</p>
 *         </div>
 *       ))}
 *     </div>
 *   )
 * }
 */

// ============================================================
// Example 4: Making Authenticated Requests
// ============================================================

/**
 * Generic function to make authenticated API calls
 */
export async function makeAuthenticatedRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token')

  if (!token) {
    throw new Error('No authentication token found')
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API request failed')
  }

  return response.json()
}

// Usage:
// const papers = await makeAuthenticatedRequest<Paper[]>(
//   `${process.env.NEXT_PUBLIC_API_URL}/participant/papers`
// )

// ============================================================
// Example 5: Form Submission with File Upload
// ============================================================

/**
 * Example for submitting a paper with file upload
 */
export async function submitPaperWithFile(
  title: string,
  abstract: string,
  authors: string[],
  file: File
): Promise<Paper> {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('abstract', abstract)
  formData.append('authors', JSON.stringify(authors))
  formData.append('file', file)

  const token = localStorage.getItem('auth_token')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/participant/papers/submit`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // Don't set Content-Type with FormData
    }
  )

  if (!response.ok) {
    throw new Error('Paper submission failed')
  }

  return response.json()
}

// ============================================================
// Example 6: Error Handling Patterns
// ============================================================

export async function safeFetch<T>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string }> {
  try {
    const token = localStorage.getItem('auth_token')

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options?.headers,
      },
    })

    if (response.status === 401) {
      // Token expired - clear auth and redirect to login
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
      return { error: 'Session expired. Please login again.' }
    }

    if (!response.ok) {
      const errorData = await response.json()
      return { error: errorData.message || 'Request failed' }
    }

    const data = await response.json()
    return { data }
  } catch (error: any) {
    return { error: error.message || 'Network error' }
  }
}

// Usage:
// const { data: papers, error } = await safeFetch<Paper[]>(
//   `${process.env.NEXT_PUBLIC_API_URL}/participant/papers`
// )
// if (error) {
//   console.error(error)
// } else {
//   console.log(papers)
// }
