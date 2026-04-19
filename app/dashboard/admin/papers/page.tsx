'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
import { useAuth } from '@/lib/auth-context'
import { ExitIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/ConfirmDialog'

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

export default function AdminPapers() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
                  <p className="text-xs text-slate-500">Papers Management</p>
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
                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition flex items-center gap-3"
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
                className="w-full text-left px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-semibold transition border-l-4 border-indigo-600 flex items-center gap-3"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Manage Evaluators</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              {/* Page Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Paper Management</h2>
                <p className="text-slate-600">
                  Assign evaluators to submitted papers and monitor evaluation progress
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Papers */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-600 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                        Total Papers
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
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
                      <p className="text-3xl font-bold text-slate-900">{stats.pending}</p>
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
                      <p className="text-3xl font-bold text-slate-900">{stats.underEvaluation}</p>
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
                      <p className="text-3xl font-bold text-slate-900">{stats.completed}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search by title, email, department, ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="all">All Papers</option>
                    <option value="pending">Pending</option>
                    <option value="evaluating">Evaluating</option>
                    <option value="completed">Accepted</option>
                  </select>
                </div>
              </div>

              {/* Papers Table */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                          Paper ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredPapers.length > 0 ? (
                        filteredPapers.map((paper) => (
                          <tr key={paper.id || paper.paperId} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                              {paper.paperId}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                              {paper.paperTitle || paper.title || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                              {paper.name || paper.authors || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                (paper.status || '').includes('PENDING')
                                  ? 'bg-orange-100 text-orange-800'
                                  : (paper.status || '').includes('EVALUATION') || paper.status === 'evaluating'
                                  ? 'bg-blue-100 text-blue-800'
                                  : (paper.status || '').includes('ACCEPTED')
                                  ? 'bg-green-100 text-green-800'
                                  : (paper.status || '').includes('REJECTED')
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-slate-100 text-slate-800'
                              }`}>
                                {paper.status || 'Unknown'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleAssignEvaluator(paper)}
                                className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                              >
                                Assign
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                            No papers found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Assign Modal */}
            {showAssignModal && selectedPaper && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 my-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Assign Evaluator</h2>
                  <p className="text-sm text-slate-600 mb-6">
                    Select an evaluator to assign to paper #{selectedPaper.paperId}
                  </p>
                  <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                    {evaluators.length > 0 ? (
                      evaluators.map((evaluator) => (
                        <button
                          key={evaluator.id || evaluator.userId}
                          onClick={() => setSelectedEvaluator(evaluator)}
                          className={`w-full text-left px-4 py-3 border rounded-lg transition ${
                            selectedEvaluator?.id === evaluator.id || selectedEvaluator?.userId === evaluator.userId
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-slate-900">
                                {evaluator.name || evaluator.username || evaluator.email}
                              </p>
                              <p className="text-xs text-slate-500">
                                {evaluator.email}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500">Workload</p>
                              <p className={`text-lg font-bold ${
                                (evaluator.workload || 0) === 0
                                  ? 'text-green-600'
                                  : (evaluator.workload || 0) < 5
                                  ? 'text-blue-600'
                                  : 'text-orange-600'
                              }`}>
                                {evaluator.workload || 0}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="text-center text-slate-500 py-4">
                        No evaluators available
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowAssignModal(false)
                        setSelectedEvaluator(null)
                      }}
                      disabled={assigning}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition font-medium text-slate-700 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmAssignment}
                      disabled={!selectedEvaluator || assigning}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
