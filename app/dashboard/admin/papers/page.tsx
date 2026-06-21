'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
import { useAuth } from '@/lib/auth-context'
import { DocumentIcon, ClockIcon, BarChartIcon, CheckCircleIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { StatCardsSkeleton, TableSkeleton } from '@/components/ui/loading-skeletons'
import DashboardShell from '@/components/dashboard/DashboardShell'
import StatCard from '@/components/dashboard/StatCard'
import { adminNav } from '@/components/dashboard/navConfig'

interface Paper {
  id?: string
  paperId?: string
  paperTitle?: string
  name?: string
  email?: string
  department?: string
  status?: string
  evaluator?: string
  submittedAt?: string
  [key: string]: any
}

function statusBadgeClass(status?: string) {
  const s = status || ''
  if (s.includes('PENDING')) return 'badge badge-amber'
  if (s.includes('EVALUATION') || s.includes('UNDER_REVIEW') || s.includes('ASSIGNED') || s === 'evaluating') return 'badge badge-blue'
  if (s.includes('ACCEPTED')) return 'badge badge-green'
  if (s.includes('REJECTED')) return 'badge badge-red'
  return 'badge badge-slate'
}

export default function AdminPapers() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const [selectedEvaluator, setSelectedEvaluator] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [papers, setPapers] = useState<Paper[]>([])
  const [evaluators, setEvaluators] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [papersData, evaluatorsData] = await Promise.all([
          apiClient.getAllPapers(),
          apiClient.getAllEvaluators(),
        ])

        setPapers(Array.isArray(papersData) ? papersData : [])
        setEvaluators(Array.isArray(evaluatorsData) ? evaluatorsData : [])
      } catch (error) {
        toast.error('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredPapers = useMemo(() => {
    return papers.filter(paper => {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        !query ||
        ((paper.paperTitle || paper.title || '')?.toLowerCase().includes(query) ||
          (paper.name || paper.authors || '')?.toLowerCase().includes(query) ||
          paper.paperId?.toLowerCase().includes(query) ||
          paper.department?.toLowerCase().includes(query))

      let matchesStatus = filterStatus === 'all'
      if (!matchesStatus) {
        if (filterStatus === 'pending') {
          matchesStatus = (paper.status || '').includes('PENDING') || paper.status === 'pending'
        } else if (filterStatus === 'evaluating') {
          matchesStatus = (paper.status || '').includes('UNDER_REVIEW') || (paper.status || '').includes('ASSIGNED') || (paper.status || '').includes('EVALUATION') || paper.status === 'evaluating'
        } else if (filterStatus === 'completed') {
          matchesStatus = paper.status === 'ACCEPTED'
        } else {
          matchesStatus = paper.status === filterStatus
        }
      }

      return matchesSearch && matchesStatus
    })
  }, [papers, searchQuery, filterStatus])

  const stats = useMemo(() => ({
    total: papers.length,
    pending: papers.filter(p => (p.status || '').includes('PENDING') || p.status === 'pending').length,
    underEvaluation: papers.filter(p => (p.status || '').includes('UNDER_REVIEW') || (p.status || '').includes('ASSIGNED') || (p.status || '').includes('EVALUATION') || p.status === 'evaluating').length,
    completed: papers.filter(p => p.status === 'ACCEPTED').length
  }), [papers])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleAssignEvaluator = (paper: Paper) => {
    setSelectedPaper(paper)
    setSelectedEvaluator(null)
    setShowAssignModal(true)
  }

  const handleConfirmAssignment = async () => {
    if (!selectedPaper || !selectedEvaluator) {
      toast.warning('Please select an evaluator')
      return
    }

    setShowConfirmDialog(true)
  }

  const handleProceedAssignment = async () => {
    if (!selectedPaper || !selectedEvaluator) return

    setAssigning(true)
    try {
      await apiClient.assignEvaluatorToPaper(
        selectedPaper.paperId || selectedPaper.id || '',
        selectedEvaluator.id || selectedEvaluator.userId || ''
      )

      // Refresh papers list
      const papersData = await apiClient.getAllPapers()
      setPapers(Array.isArray(papersData) ? papersData : [])

      setShowAssignModal(false)
      setShowConfirmDialog(false)
      setSelectedPaper(null)
      setSelectedEvaluator(null)
      toast.success('Evaluator assigned successfully!')
    } catch (err: any) {
      toast.error(err.message || 'Failed to assign evaluator')
    } finally {
      setAssigning(false)
      setShowConfirmDialog(false) // Just in case
    }
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardShell roleLabel="Administrator" navItems={adminNav} user={user} onLogout={handleLogout}>
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">Paper Management</h2>
          <p className="text-slate-500 text-sm">
            Assign evaluators to submitted papers and monitor evaluation progress
          </p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <StatCardsSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Papers" value={stats.total} accent="blue" icon={<DocumentIcon className="w-5 h-5" />} />
            <StatCard label="Pending" value={stats.pending} accent="amber" icon={<ClockIcon className="w-5 h-5" />} />
            <StatCard label="Evaluating" value={stats.underEvaluation} accent="blue" icon={<BarChartIcon className="w-5 h-5" />} />
            <StatCard label="Accepted" value={stats.completed} accent="green" icon={<CheckCircleIcon className="w-5 h-5" />} />
          </div>
        )}

        {loading ? (
          <TableSkeleton rows={6} cols={5} />
        ) : (
          <>
            {/* Search and Filter */}
            <div className="card p-4 mb-6">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by title, email, department, ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field lg:w-48"
                >
                  <option value="all">All Papers</option>
                  <option value="pending">Pending</option>
                  <option value="evaluating">Evaluating</option>
                  <option value="completed">Accepted</option>
                </select>
              </div>
            </div>

            {/* Papers Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Paper ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPapers.length > 0 ? (
                      filteredPapers.map((paper) => (
                        <tr key={paper.id || paper.paperId} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            {paper.paperId}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {paper.paperTitle || paper.title || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {paper.name || paper.authors || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={statusBadgeClass(paper.status)}>
                              {paper.status || 'Unknown'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleAssignEvaluator(paper)}
                              className="text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors"
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
                          No papers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Assign Modal */}
        {showAssignModal && selectedPaper && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="card-elevated max-w-md w-full p-6 my-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-1">Assign Evaluator</h2>
              <p className="text-sm text-slate-500 mb-5">
                Select an evaluator to assign to paper #{selectedPaper.paperId}
              </p>
              <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                {evaluators.length > 0 ? (
                  evaluators.map((evaluator) => {
                    const isSelected = selectedEvaluator?.id === evaluator.id || selectedEvaluator?.userId === evaluator.userId
                    const workload = evaluator.workload || 0
                    return (
                      <button
                        key={evaluator.id || evaluator.userId}
                        onClick={() => setSelectedEvaluator(evaluator)}
                        className={`w-full text-left px-4 py-3 border rounded-lg transition ${
                          isSelected ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 truncate">
                              {evaluator.name || evaluator.username || evaluator.email}
                            </p>
                            <p className="text-xs text-slate-500 truncate">{evaluator.email}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs text-slate-400">Workload</p>
                            <p className={`text-lg font-semibold tabular-nums ${
                              workload === 0 ? 'text-emerald-600' : workload < 5 ? 'text-blue-600' : 'text-amber-600'
                            }`}>
                              {workload}
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  })
                ) : (
                  <p className="text-center text-sm text-slate-500 py-4">No evaluators available</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false)
                    setSelectedEvaluator(null)
                  }}
                  disabled={assigning}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAssignment}
                  disabled={!selectedEvaluator || assigning}
                  className="btn-primary flex-1"
                >
                  {assigning ? 'Assigning...' : 'Assign'}
                </button>
              </div>
            </div>
          </div>
        )}

        <ConfirmDialog
          isOpen={showConfirmDialog}
          title="Confirm Assignment"
          message={`Are you sure you want to assign ${selectedEvaluator?.name || selectedEvaluator?.email} to evaluate the paper "${selectedPaper?.title}"?`}
          confirmText="Yes, Assign"
          cancelText="Cancel"
          isLoading={assigning}
          onConfirm={handleProceedAssignment}
          onCancel={() => setShowConfirmDialog(false)}
        />
      </DashboardShell>
    </ProtectedRoute>
  )
}
