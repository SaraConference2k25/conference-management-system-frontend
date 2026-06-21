'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
import { useAuth } from '@/lib/auth-context'
import { DocumentIcon, ClockIcon, CheckCircleIcon, UsersIcon, XIcon, BarChartIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { AdminStatsSkeleton } from '@/components/ui/loading-skeletons'
import DashboardShell from '@/components/dashboard/DashboardShell'
import StatCard from '@/components/dashboard/StatCard'
import { adminNav } from '@/components/dashboard/navConfig'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()
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
      <DashboardShell roleLabel="Administrator" navItems={adminNav} user={user} onLogout={handleLogout}>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">Welcome back, Admin</h2>
          <p className="text-slate-500 text-sm">
            Manage papers, evaluators, and track conference progress in real time
          </p>
        </div>

        {loading ? (
          <AdminStatsSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <StatCard label="Total Papers" value={stats.totalPapers} accent="blue" icon={<DocumentIcon className="w-5 h-5" />} />
            <StatCard label="Pending" value={stats.pendingPapers} accent="amber" icon={<ClockIcon className="w-5 h-5" />} />
            <StatCard label="Evaluating" value={stats.evaluatingPapers} accent="blue" icon={<BarChartIcon className="w-5 h-5" />} />
            <StatCard label="Accepted" value={stats.completedPapers} accent="green" icon={<CheckCircleIcon className="w-5 h-5" />} />
            <StatCard label="Evaluators" value={stats.totalEvaluators} accent="purple" icon={<UsersIcon className="w-5 h-5" />} />
            <StatCard label="Rejected" value={stats.totalRejected} accent="red" icon={<XIcon className="w-5 h-5" />} />
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/dashboard/admin/papers" className="card p-6 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-md bg-blue-700 flex items-center justify-center">
                  <DocumentIcon className="w-5 h-5 text-white" />
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Manage Papers</h3>
              <p className="text-sm text-slate-500">Assign evaluators, track progress, and manage paper submissions</p>
            </Link>

            <Link href="/dashboard/admin/evaluators" className="card p-6 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-md bg-violet-600 flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-white" />
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-violet-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Manage Evaluators</h3>
              <p className="text-sm text-slate-500">Create, edit, and manage evaluator accounts and workload distribution</p>
            </Link>
          </div>
        )}
      </DashboardShell>
    </ProtectedRoute>
  )
}
