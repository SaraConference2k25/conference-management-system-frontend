'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentIcon, PlusIcon, EyeIcon, ExitIcon, MenuIcon, XIcon, BarChartIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { getInitials, getDisplayName } from '@/lib/utils/avatar'
import { DashboardPageSkeleton } from '@/components/ui/loading-skeletons'

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

  if (isLoading) {
    return <DashboardPageSkeleton />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 dashboard-header shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
              </button>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                  SARA 2026
                </h1>
                <p className="text-xs text-blue-200/80">Participant Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-white/90 line-clamp-1">
                  {getDisplayName(authUser?.fullName, authUser?.email)}
                </span>
                <span className="text-xs text-blue-200/70">Participant</span>
              </div>
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/15 flex items-center justify-center ring-1 ring-white/20">
                <span className="text-white font-medium text-xs">{getInitials(authUser?.fullName || '', authUser?.email || '')}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md font-medium transition-colors text-xs sm:text-sm"
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
        <div className="md:hidden bg-white border-b border-slate-200">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            <Link href="/dashboard" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md font-medium">Dashboard</Link>
            <Link href="/dashboard/upload" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md font-medium">Upload Paper</Link>
            <Link href="/dashboard/my-papers" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md font-medium">My Papers</Link>
          </nav>
        </div>
      )}

      <div className="flex">
        <aside className="hidden md:block w-60 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)]">
          <nav className="sticky top-16 p-4 space-y-0.5">
            <Link href="/dashboard" className="block px-3 py-2.5 text-sm text-blue-700 bg-blue-50 rounded-md font-medium border-l-2 border-blue-700 -ml-px pl-[11px]">Dashboard</Link>
            <Link href="/dashboard/upload" className="block px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-md font-medium transition-colors">Upload Paper</Link>
            <Link href="/dashboard/my-papers" className="block px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-md font-medium transition-colors">My Papers</Link>
          </nav>
        </aside>

        <main className="flex-1 p-4 sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">
              Welcome back, {getDisplayName(authUser?.fullName, authUser?.email).split(' ')[0]}
            </h2>
            <p className="text-slate-500 text-sm">Manage your paper submissions and track their progress</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardStats.map((stat, idx) => (
              <div key={idx} className="card p-5">
                <div className={`w-9 h-9 rounded-md bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <BarChartIcon className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-500 text-xs font-medium mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-slate-900 tabular-nums">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Link href="/dashboard/upload" className="card p-6 hover:shadow-md transition-shadow group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-md bg-blue-700 flex items-center justify-center">
                  <PlusIcon className="w-5 h-5 text-white" />
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Submit New Paper</h3>
              <p className="text-sm text-slate-500 mb-3">Upload and submit your research paper for conference review</p>
              <span className="text-sm text-blue-700 font-medium">Get started →</span>
            </Link>

            <Link href="/dashboard/my-papers" className="card p-6 hover:shadow-md transition-shadow group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-md bg-emerald-600 flex items-center justify-center">
                  <DocumentIcon className="w-5 h-5 text-white" />
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">My Papers</h3>
              <p className="text-sm text-slate-500 mb-3">View and track the status of your submitted papers</p>
              <span className="text-sm text-emerald-700 font-medium">View papers →</span>
            </Link>
          </div>

          <div className="mt-6 card p-5 bg-blue-50/50 border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-md bg-blue-700 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 9a1 1 0 100-2 1 1 0 000 2zm5 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">Conference Information</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  SARA 2026 National Conference will be held on April 3–4, 2026 at Saranathan College of Engineering, Trichy. Submit your papers by the deadline to be considered for review and presentation.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
