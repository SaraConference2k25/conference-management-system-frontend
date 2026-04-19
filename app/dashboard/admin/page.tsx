'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
import { useAuth } from '@/lib/auth-context'
import { ExitIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [stats, setStats] = useState({
    totalPapers: 0,
    pendingPapers: 0,
    evaluatingPapers: 0,
    completedPapers: 0,
    totalEvaluators: 0,
    totalRejected: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const metrics = await apiClient.getAdminMetrics()
        setStats({
          totalPapers: metrics.totalPapers || 0,
          pendingPapers: metrics.totalPending || 0,
          evaluatingPapers: (metrics.totalPapers || 0) - ((metrics.totalPending || 0) + (metrics.totalAccepted || 0) + (metrics.totalRejected || 0)),
          completedPapers: metrics.totalAccepted || 0,
          totalEvaluators: metrics.totalEvaluators || 0,
          totalRejected: metrics.totalRejected || 0,
        })
      } catch (error) {
        console.error('Error fetching admin metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  AD
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-xs text-slate-500">Overview</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600 hidden sm:inline">
                  <span className="font-semibold text-slate-900">{user?.email}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                >
                  <ExitIcon className="w-5 h-5" />
                  <span className="text-sm hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Container */}
        <div className="flex flex-1 overflow-hidden">
          {/* Overlay for mobile */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-black/50 lg:hidden z-30" onClick={() => setIsMenuOpen(false)} />
          )}

          {/* Sidebar */}
          <aside
            className={`w-64 bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto lg:translate-x-0 fixed left-0 top-20 bottom-0 z-40 lg:static lg:top-0 border-r border-slate-200 ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <nav className="p-4 space-y-2">
              <button
                onClick={() => {
                  router.push('/dashboard/admin')
                  setIsMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-semibold transition border-l-4 border-indigo-600 flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => {
                  router.push('/dashboard/admin/papers')
                  setIsMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Manage Papers</span>
              </button>

              <button
                onClick={() => {
                  router.push('/dashboard/admin/evaluators')
                  setIsMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
                <span>Manage Evaluators</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back, Admin</h2>
                <p className="text-slate-600">
                  Manage papers, evaluators, and track conference progress in real-time
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Total Papers */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-600 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                        Total Papers
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.totalPapers}</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Pending Papers */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-1">
                        Pending
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.pendingPapers}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Under Evaluation */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                        Evaluating
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.evaluatingPapers}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Accepted Papers */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">
                        Accepted
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.completedPapers}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Total Evaluators */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-1">
                        Total Evaluators
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.totalEvaluators}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Total Rejected */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-1">
                        Total Rejected
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.totalRejected}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Manage Papers Card */}
                <button
                  onClick={() => router.push('/dashboard/admin/papers')}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-slate-200 text-left group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                      Manage Papers
                    </h3>
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-slate-600">
                    Assign evaluators, track progress, and manage paper submissions
                  </p>
                </button>

                {/* Manage Evaluators Card */}
                <button
                  onClick={() => router.push('/dashboard/admin/evaluators')}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-slate-200 text-left group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition">
                      Manage Evaluators
                    </h3>
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-slate-600">
                    Create, edit, and manage evaluator accounts and workload distribution
                  </p>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
