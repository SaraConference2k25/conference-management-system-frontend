'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentIcon, BarChartIcon, CogIcon, AwardIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
import { getDisplayName } from '@/lib/utils/avatar'
import DashboardShell from '@/components/dashboard/DashboardShell'
import StatCard from '@/components/dashboard/StatCard'
import { evaluatorNav } from '@/components/dashboard/navConfig'

function EvaluatorDashboardContent() {
  const router = useRouter()
  const { user: authUser, isLoading } = useAuth()

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
    <DashboardShell roleLabel="Evaluator" navItems={evaluatorNav} user={authUser} onLogout={handleLogout}>
      <div className="mb-8">
        <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-blue-700">Reviewer workspace</p>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#10213f] mb-1">
          Welcome back, {getDisplayName(authUser?.fullName, authUser?.email).split(' ')[0]}
        </h2>
        <p className="text-slate-500 text-sm">
          Review and evaluate submitted papers. Your expertise helps maintain academic excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mb-8">
        {/* Evaluate Papers */}
        <Link href="/dashboard/evaluator/evaluate-papers" className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5">
          <div className="w-11 h-11 rounded-md bg-blue-700 flex items-center justify-center mb-4">
            <DocumentIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Evaluate Papers</h3>
          <p className="text-sm text-slate-500 mb-3">
            Review submitted papers and provide constructive feedback based on quality and relevance.
          </p>
          <span className="text-sm text-blue-700 font-medium">Start evaluation →</span>
        </Link>

        {/* Evaluation Statistics */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 opacity-75 shadow-sm">
          <div className="w-11 h-11 rounded-md bg-emerald-600 flex items-center justify-center mb-4">
            <BarChartIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Evaluation Statistics</h3>
          <p className="text-sm text-slate-500 mb-3">
            View your evaluation history and track approved and rejected papers at a glance.
          </p>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 bg-slate-100 text-slate-600">Coming soon</span>
        </div>

        {/* Settings */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 opacity-75 shadow-sm">
          <div className="w-11 h-11 rounded-md bg-violet-600 flex items-center justify-center mb-4">
            <CogIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Settings</h3>
          <p className="text-sm text-slate-500 mb-3">
            Configure evaluation criteria and preferences for the paper review process.
          </p>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 bg-slate-100 text-slate-600">Coming soon</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Papers to Review" value="—" accent="blue" icon={<DocumentIcon className="w-5 h-5" />} />
        <StatCard label="Papers Approved" value="—" accent="green" icon={<AwardIcon className="w-5 h-5" />} />
        <StatCard label="Papers Rejected" value="—" accent="red" icon={<BarChartIcon className="w-5 h-5" />} />
      </div>
    </DashboardShell>
  )
}

export default function EvaluatorDashboard() {
  return (
    <ProtectedRoute requiredRole="evaluator">
      <EvaluatorDashboardContent />
    </ProtectedRoute>
  )
}
