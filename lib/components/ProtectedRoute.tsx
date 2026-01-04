/**
 * Example: Protected Route Component
 * Use this pattern for pages that require authentication
 */

'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'participant' | 'evaluator' | 'admin'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login if not authenticated
      router.push('/login?redirect=' + window.location.pathname)
    } else if (requiredRole && user) {
      // Normalize both roles to lowercase for comparison
      const userRole = (user.role || '').toLowerCase()
      const requiredRoleNormalized = (requiredRole || '').toLowerCase()
      
      if (userRole !== requiredRoleNormalized) {
        // Redirect to appropriate dashboard based on user role
        const redirectPath = userRole === 'evaluator' ? '/dashboard/evaluator' : '/dashboard'
        router.push(redirectPath)
      }
    }
  }, [user, isLoading, requiredRole, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You do not have permission to access this page.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

/**
 * Example Usage in Dashboard Page:
 * 
 * import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
 * 
 * export default function DashboardPage() {
 *   return (
 *     <ProtectedRoute requiredRole="participant">
 *       <div>Your dashboard content here</div>
 *     </ProtectedRoute>
 *   )
 * }
 */
