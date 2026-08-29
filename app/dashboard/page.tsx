'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentIcon, PlusIcon, CheckCircleIcon, ClockIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { getDisplayName } from '@/lib/utils/avatar'
import { DashboardPageSkeleton, StatCardsSkeleton } from '@/components/ui/loading-skeletons'
import DashboardShell from '@/components/dashboard/DashboardShell'
import StatCard from '@/components/dashboard/StatCard'
import { participantNav } from '@/components/dashboard/navConfig'

export default function ParticipantDashboard() {
  const router = useRouter()
  const { user: authUser, isLoading } = useAuth()
  const [stats, setStats] = useState({
    totalPapers: 0,
    netSubmitted: 0,
    underReview: 0,
    accepted: 0,
  })
  const [statsLoading, setStatsLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login')
    }
  }, [authUser, isLoading, router])

  // Fetch real-time paper metrics for the logged-in participant
  useEffect(() => {
    if (!authUser?.email) return

    let active = true
    const fetchStats = async () => {
      setStatsLoading(true)
      try {
        const metrics = await apiClient.getParticipantMetrics(authUser.email)
        if (active) {
          setStats({
            totalPapers: metrics.totalPapers || 0,
            netSubmitted: metrics.netSubmitted || 0,
            underReview: metrics.underReview || 0,
            accepted: metrics.accepted || 0,
          })
        }
      } catch (error) {
        console.error('Error fetching participant metrics:', error)
      } finally {
        if (active) setStatsLoading(false)
      }
    }

    fetchStats()
    return () => {
      active = false
    }
  }, [authUser?.email])

  const dashboardStats = [
    { label: 'Total Papers', value: stats.totalPapers, icon: <DocumentIcon className="w-5 h-5" />, accent: 'blue' as const },
    { label: 'Submitted', value: stats.netSubmitted, icon: <CheckCircleIcon className="w-5 h-5" />, accent: 'green' as const },
    { label: 'Under Review', value: stats.underReview, icon: <ClockIcon className="w-5 h-5" />, accent: 'amber' as const },
    { label: 'Accepted', value: stats.accepted, icon: <CheckCircleIcon className="w-5 h-5" />, accent: 'purple' as const },
  ]

  const handleLogout = () => {
    apiClient.logout()
    router.push('/login')
  }

  if (isLoading) {
    return <DashboardPageSkeleton />
  }

  return (
    <DashboardShell roleLabel="Participant" navItems={participantNav} user={authUser} onLogout={handleLogout}>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-blue-700">Participant workspace</p>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#10213f] mb-1">
          Welcome back, {getDisplayName(authUser?.fullName, authUser?.email).split(' ')[0]}
          </h2>
          <p className="text-slate-500 text-sm">Manage your paper submissions and track their progress.</p>
        </div>
        <Link href="/dashboard/upload" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#123c83] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0e3270]">
          <PlusIcon className="h-4 w-4" /> Submit paper
        </Link>
      </div>

      {statsLoading ? (
        <div className="mb-8">
          <StatCardsSkeleton count={4} />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dashboardStats.map((stat, idx) => (
            <StatCard key={idx} label={stat.label} value={stat.value} icon={stat.icon} accent={stat.accent} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Link href="/dashboard/upload" className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-700 shadow-sm">
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

        <Link href="/dashboard/my-papers" className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-900/5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600 shadow-sm">
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

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-5">
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
    </DashboardShell>
  )
}
