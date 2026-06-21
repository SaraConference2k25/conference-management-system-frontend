'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
import { useAuth } from '@/lib/auth-context'
import { UsersIcon, BarChartIcon, CheckCircleIcon, PlusIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { StatCardsSkeleton, TableSkeleton } from '@/components/ui/loading-skeletons'
import DashboardShell from '@/components/dashboard/DashboardShell'
import StatCard from '@/components/dashboard/StatCard'
import { adminNav } from '@/components/dashboard/navConfig'

interface Evaluator {
  id?: string
  userId?: string
  name?: string
  username?: string
  email?: string
  department?: string
  workload?: number
  status?: string
  [key: string]: any
}

export default function AdminEvaluators() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [evaluators, setEvaluators] = useState<Evaluator[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  // Dialog state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [evaluatorToDelete, setEvaluatorToDelete] = useState<Evaluator | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Form states
  const [newEvaluator, setNewEvaluator] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: ''
  })

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const evaluatorsData = await apiClient.getAllEvaluators()
        setEvaluators(Array.isArray(evaluatorsData) ? evaluatorsData : [])
      } catch (error) {
        toast.error('Failed to fetch evaluators')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredEvaluators = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return evaluators.filter(
      (e) =>
        !query ||
        (e.username || e.name || '')?.toLowerCase().includes(query) ||
        (e.email || '')?.toLowerCase().includes(query) ||
        (e.department || '')?.toLowerCase().includes(query)
    )
  }, [evaluators, searchQuery])

  const stats = useMemo(() => ({
    total: evaluators.length,
    active: evaluators.filter(e => (e.workload || 0) > 0).length,
    available: evaluators.filter(e => (e.workload || 0) === 0).length,
    totalWorkload: evaluators.reduce((sum, e) => sum + (e.workload || 0), 0)
  }), [evaluators])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleCreateEvaluator = async () => {
    if (!newEvaluator.username || !newEvaluator.email || !newEvaluator.password || !newEvaluator.confirmPassword) {
      toast.warning('Please fill in all required fields')
      return
    }

    if (newEvaluator.password !== newEvaluator.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setCreating(true)
    try {
      await apiClient.createEvaluator(newEvaluator)

      // Refresh evaluators list
      const evaluatorsData = await apiClient.getAllEvaluators()
      setEvaluators(Array.isArray(evaluatorsData) ? evaluatorsData : [])

      setShowCreateModal(false)
      setNewEvaluator({ username: '', email: '', password: '', confirmPassword: '', department: '' })
      toast.success('Evaluator created successfully!')
    } catch (err: any) {
      toast.error(err.message || 'Failed to create evaluator')
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteEvaluator = (evaluator: Evaluator) => {
    setEvaluatorToDelete(evaluator)
    setShowDeleteDialog(true)
  }

  const handleProceedDelete = async () => {
    if (!evaluatorToDelete) return

    setIsDeleting(true)
    try {
      await apiClient.deleteEvaluator(evaluatorToDelete.id || evaluatorToDelete.userId || '')

      // Refresh evaluators list
      const evaluatorsData = await apiClient.getAllEvaluators()
      setEvaluators(Array.isArray(evaluatorsData) ? evaluatorsData : [])

      toast.success('Evaluator deleted successfully!')
      setShowDeleteDialog(false)
      setEvaluatorToDelete(null)
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete evaluator')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardShell roleLabel="Administrator" navItems={adminNav} user={user} onLogout={handleLogout}>
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">Evaluator Management</h2>
            <p className="text-slate-500 text-sm">Create and manage evaluator accounts</p>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <PlusIcon className="w-4 h-4" />
            Create Evaluator
          </button>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <StatCardsSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Evaluators" value={stats.total} accent="blue" icon={<UsersIcon className="w-5 h-5" />} />
            <StatCard label="Active" value={stats.active} accent="blue" icon={<BarChartIcon className="w-5 h-5" />} />
            <StatCard label="Available" value={stats.available} accent="green" icon={<CheckCircleIcon className="w-5 h-5" />} />
            <StatCard label="Total Workload" value={stats.totalWorkload} accent="amber" icon={<BarChartIcon className="w-5 h-5" />} />
          </div>
        )}

        {loading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : (
          <>
            {/* Search */}
            <div className="card p-4 mb-6">
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Evaluators Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Workload</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEvaluators.length > 0 ? (
                      filteredEvaluators.map((evaluator) => {
                        const workload = evaluator.workload || 0
                        return (
                          <tr key={evaluator.id || evaluator.userId} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                              {evaluator.name || evaluator.username || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                              {evaluator.email || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                              {evaluator.department || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`badge ${workload === 0 ? 'badge-green' : workload < 5 ? 'badge-blue' : 'badge-amber'}`}>
                                {workload}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`badge ${workload > 0 ? 'badge-blue' : 'badge-green'}`}>
                                {workload > 0 ? 'Active' : 'Available'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleDeleteEvaluator(evaluator)}
                                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-500">
                          No evaluators found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="card-elevated max-w-md w-full p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-5">Create Evaluator</h2>
              <div className="space-y-4">
                <div>
                  <label className="field-label">Username *</label>
                  <input
                    type="text"
                    value={newEvaluator.username}
                    onChange={(e) => setNewEvaluator({ ...newEvaluator, username: e.target.value })}
                    className="input-field"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="field-label">Email *</label>
                  <input
                    type="email"
                    value={newEvaluator.email}
                    onChange={(e) => setNewEvaluator({ ...newEvaluator, email: e.target.value })}
                    className="input-field"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="field-label">Password *</label>
                  <input
                    type="password"
                    value={newEvaluator.password}
                    onChange={(e) => setNewEvaluator({ ...newEvaluator, password: e.target.value })}
                    className="input-field"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="field-label">Confirm Password *</label>
                  <input
                    type="password"
                    value={newEvaluator.confirmPassword}
                    onChange={(e) => setNewEvaluator({ ...newEvaluator, confirmPassword: e.target.value })}
                    className="input-field"
                    placeholder="Confirm password"
                  />
                </div>
                <div>
                  <label className="field-label">Department</label>
                  <input
                    type="text"
                    value={newEvaluator.department}
                    onChange={(e) => setNewEvaluator({ ...newEvaluator, department: e.target.value })}
                    className="input-field"
                    placeholder="Enter department"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setNewEvaluator({ username: '', email: '', password: '', confirmPassword: '', department: '' })
                  }}
                  disabled={creating}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button onClick={handleCreateEvaluator} disabled={creating} className="btn-primary flex-1">
                  {creating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}

        <ConfirmDialog
          isOpen={showDeleteDialog}
          title="Confirm Deletion"
          message={`Are you sure you want to delete evaluator "${evaluatorToDelete?.name || evaluatorToDelete?.email}"? This action cannot be undone.`}
          confirmText="Delete Evaluator"
          cancelText="Cancel"
          isDestructive={true}
          isLoading={isDeleting}
          onConfirm={handleProceedDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      </DashboardShell>
    </ProtectedRoute>
  )
}
