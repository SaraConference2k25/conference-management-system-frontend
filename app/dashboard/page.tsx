'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentIcon, PlusIcon, EyeIcon, ExitIcon, MenuIcon, XIcon, BarChartIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { getInitials, getDisplayName } from '@/lib/utils/avatar'

export default function ParticipantDashboard() {
  const router = useRouter()
  const { user: authUser, isLoading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login')
    }
  }, [authUser, isLoading, router])

  const dashboardStats = [
    { label: 'Total Papers', value: 3, color: 'from-blue-500 to-blue-600' },
    { label: 'Submitted', value: 2, color: 'from-green-500 to-green-600' },
    { label: 'Under Review', value: 1, color: 'from-amber-500 to-amber-600' },
    { label: 'Accepted', value: 0, color: 'from-purple-500 to-purple-600' },
  ]

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
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  SARA 2025
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 font-medium">Participant Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs sm:text-sm font-semibold text-blue-50 line-clamp-1">
                  {getDisplayName(authUser?.fullName, authUser?.email)}
                </span>
                <span className="text-xs text-blue-100">
                  Participant
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
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/upload"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
            >
              Upload Paper
            </Link>
            <Link
              href="/dashboard/my-papers"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
            >
              My Papers
            </Link>
          </nav>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <nav className="sticky top-20 p-6 space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors font-semibold border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/upload"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-semibold border-l-4 border-transparent"
            >
              Upload Paper
            </Link>
            <Link
              href="/dashboard/my-papers"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-semibold border-l-4 border-transparent"
            >
              My Papers
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
              Welcome Back, {getDisplayName(authUser?.fullName, authUser?.email).split(' ')[0]}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Manage your paper submissions and track their progress
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {dashboardStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl transition-shadow"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4`}>
                  <BarChartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium mb-1 tracking-wide">
                  {stat.label}
                </p>
                <p className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Submit Paper Card */}
            <Link
              href="/dashboard/upload"
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 sm:p-8 hover:shadow-xl transition-all hover:scale-105 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlusIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white mb-2">Submit New Paper</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                Upload and submit your research paper for conference review
              </p>
              <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* View Papers Card */}
            <Link
              href="/dashboard/my-papers"
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 sm:p-8 hover:shadow-xl transition-all hover:scale-105 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DocumentIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white mb-2">My Papers</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                View and track the status of your submitted papers
              </p>
              <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xs sm:text-sm">
                View Papers
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 9a1 1 0 100-2 1 1 0 000 2zm5 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">Conference Information</h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                  SARA 2025 National Conference will be held on April 3-4, 2026 at Saranathan College of Engineering, Trichy. Submit your papers by the deadline to be considered for review and presentation.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
