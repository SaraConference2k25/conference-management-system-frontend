/**
 * Example: Protected Route Component
 * Use this pattern for pages that require authentication
 */

'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { DashboardPageSkeleton } from '@/components/ui/loading-skeletons'

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
        const redirectPath = 
          userRole === 'evaluator' ? '/dashboard/evaluator' :
          userRole === 'admin' ? '/dashboard/admin' :
          '/dashboard'
        router.push(redirectPath)
      }
    }
  }, [user, isLoading, requiredRole, router])

  if (isLoading) {
    return <DashboardPageSkeleton />
  }

  if (!user) {
    return null
  }

  if (requiredRole && (user.role || '').toLowerCase() !== requiredRole.toLowerCase()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center max-w-md rounded-xl border border-slate-200 bg-white shadow-sm p-8">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-500 mb-6">You do not have permission to access this page.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium leading-5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
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
