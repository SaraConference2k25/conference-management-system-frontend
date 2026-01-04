'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MenuIcon, XIcon, ExitIcon, DocumentIcon, BarChartIcon, CogIcon, AwardIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
import { getInitials, getDisplayName } from '@/lib/utils/avatar'

function EvaluatorDashboardContent() {
  const router = useRouter()
  const { user: authUser, isLoading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login')
    }
  }, [authUser, isLoading, router])

  const handleLogout = () => {
    apiClient.logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-950 dark:via-indigo-950 dark:to-gray-950 shadow-lg border-b border-blue-800 dark:border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-blue-500/50 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
              </button>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  Evaluator Dashboard
                </h1>
                <p className="text-blue-100 text-xs sm:text-sm">Review and evaluate submissions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs sm:text-sm font-semibold text-blue-50 line-clamp-1">
                  {getDisplayName(authUser?.fullName, authUser?.email)}
                </span>
                <span className="text-xs text-blue-100">
                  Evaluator
                </span>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/20 dark:bg-blue-400/20 flex items-center justify-center border border-white/30">
                <span className="text-white font-bold text-xs sm:text-sm">{getInitials(authUser?.fullName || '', authUser?.email || '')}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg font-semibold transition-all text-xs sm:text-sm shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <ExitIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <nav className="absolute left-0 top-16 right-0 bg-white dark:bg-gray-800 shadow-lg">
            <div className="p-4 space-y-2">
              <Link
                href="/dashboard/evaluator"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors font-semibold border-l-4 border-blue-600"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/evaluator/evaluate-papers"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-semibold border-l-4 border-transparent"
              >
                Evaluate Papers
              </Link>
            </div>
          </nav>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-0 md:gap-0 min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <nav className="sticky top-20 p-6 space-y-2">
            <Link
              href="/dashboard/evaluator"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors font-semibold border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/evaluator/evaluate-papers"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-semibold border-l-4 border-transparent"
            >
              Evaluate Papers
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8">
          {/* Page Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
              Welcome to Evaluator Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Review and evaluate submitted papers from participants. Your expertise helps maintain academic excellence.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Evaluate Papers Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 flex items-center justify-center">
                <DocumentIcon className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Evaluate Papers
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Review submitted papers and provide constructive feedback. Accept or reject submissions based on quality and relevance.
                </p>
                <Link
                  href="/dashboard/evaluator/evaluate-papers"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors w-full justify-center"
                >
                  <DocumentIcon className="w-5 h-5" />
                  Start Evaluation
                </Link>
              </div>
            </div>

            {/* Evaluation Statistics Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group opacity-70">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 flex items-center justify-center">
                <BarChartIcon className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Evaluation Statistics
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  View your evaluation history and statistics. Track approved and rejected papers at a glance.
                </p>
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg font-semibold cursor-not-allowed w-full"
                >
                  <BarChartIcon className="w-5 h-5" />
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group opacity-70">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 flex items-center justify-center">
                <CogIcon className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Settings
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Configure evaluation criteria and preferences for the paper review process.
                </p>
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg font-semibold cursor-not-allowed w-full"
                >
                  <CogIcon className="w-5 h-5" />
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Section */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Papers to Review</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">—</p>
                </div>
                <DocumentIcon className="w-12 h-12 text-blue-500/30" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Papers Approved</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">—</p>
                </div>
                <AwardIcon className="w-12 h-12 text-green-500/30" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 rounded-lg p-6 border border-red-200 dark:border-red-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">Papers Rejected</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">—</p>
                </div>
                <BarChartIcon className="w-12 h-12 text-red-500/30" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function EvaluatorDashboard() {
  return (
    <ProtectedRoute requiredRole="evaluator">
      <EvaluatorDashboardContent />
    </ProtectedRoute>
  )
}
