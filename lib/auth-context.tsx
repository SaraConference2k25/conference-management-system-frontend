'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from './api'

export interface User {
  id: string
  email: string
  fullName?: string
  role: 'participant' | 'evaluator' | 'admin' | 'PARTICIPANT' | 'EVALUATOR' | 'ADMIN'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string, role: string) => Promise<void>
  register: (email: string, password: string, fullName: string, affiliation?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('auth_token')

        if (storedUser && token) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('auth_token')
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true)
    try {
      const response = await apiClient.login(email, password, role)
      
      // Store token
      if (response.token) {
        apiClient.setAuthToken(response.token)
      }
      
      // Handle both response structures:
      // Structure 1: { user: { id, email, role }, token, message }
      // Structure 2: { id, email, role, token, message }
      let userData: User
      
      if (response.user) {
        // Standard structure with nested user object
        userData = {
          id: response.user.id || email,
          email: response.user.email || email,
          fullName: (response.user as any).fullName,
          role: (response.user.role || role).toLowerCase() as User['role'],
        }
      } else {
        // Flat structure or fallback
        userData = {
          id: (response as any).id || email,
          email: email,
          fullName: (response as any).fullName,
          role: (role || 'participant').toLowerCase() as User['role'],
        }
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, fullName: string, affiliation?: string) => {
    setIsLoading(true)
    try {
      const response = await apiClient.register({
        email,
        password,
        fullName,
        affiliation,
        role: 'PARTICIPANT', // Default role for new registrations
      })

      // For registration, you might want to auto-login or just redirect to login
      // This depends on your backend behavior
      console.log('Registration successful:', response)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    apiClient.logout()
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
