'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
import { useAuth } from '@/lib/auth-context'
import { ExitIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'

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

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [evaluators, setEvaluators] = useState<Evaluator[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  // Form states
  const [newEvaluator, setNewEvaluator] = useState({
    name: '',
    email: '',
    password: '',
    department: ''
  })

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const evaluatorsData = await apiClient.getAllEvaluators()
        setEvaluators(Array.isArray(evaluatorsData) ? evaluatorsData : [])
      } catch (error) {
        console.error('Error fetching evaluators:', error)
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
        (e.name || '')?.toLowerCase().includes(query) ||
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
    if (!newEvaluator.name || !newEvaluator.email || !newEvaluator.password) {
      alert('Please fill in all required fields')
      return
    }

    setCreating(true)
    try {
      await apiClient.createEvaluator(newEvaluator)
      
      // Refresh evaluators list
      const evaluatorsData = await apiClient.getAllEvaluators()
      setEvaluators(Array.isArray(evaluatorsData) ? evaluatorsData : [])
      
      setShowCreateModal(false)
      setNewEvaluator({ name: '', email: '', password: '', department: '' })
      alert('Evaluator created successfully!')
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to create evaluator'}`)
      console.error(err)
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteEvaluator = async (evaluator: Evaluator) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${evaluator.name || evaluator.email}?`
    )

    if (!confirmed) return

    try {
      await apiClient.deleteEvaluator(evaluator.id || evaluator.userId || '')
      
      // Refresh evaluators list
      const evaluatorsData = await apiClient.getAllEvaluators()
      setEvaluators(Array.isArray(evaluatorsData) ? evaluatorsData : [])
      
      alert('Evaluator deleted successfully!')
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to delete evaluator'}`)
      console.error(err)
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
                  <p className="text-xs text-slate-500">Evaluators Management</p>
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
                className="w-full text-left px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-semibold transition border-l-4 border-indigo-600 flex items-center gap-3"
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Evaluator Management</h2>
                  <p className="text-slate-600">
                    Create and manage evaluator accounts
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Evaluator
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Evaluators */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-600 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                        Total Evaluators
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Active Evaluators */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                        Active
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.active}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Available Evaluators */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">
                        Available
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.available}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Total Workload */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-1">
                        Total Workload
                      </p>
                      <p className="text-3xl font-bold text-slate-900">{stats.totalWorkload}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <input
                  type="text"
                  placeholder="Search by name, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Evaluators Table */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                          Workload
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
                      {filteredEvaluators.length > 0 ? (
                        filteredEvaluators.map((evaluator) => (
                          <tr key={evaluator.id || evaluator.userId} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                              {evaluator.name || evaluator.username || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                              {evaluator.email || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                              {evaluator.department || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                (evaluator.workload || 0) === 0
                                  ? 'bg-green-100 text-green-800'
                                  : (evaluator.workload || 0) < 5
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-orange-100 text-orange-800'
                              }`}>
                                {evaluator.workload || 0}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                (evaluator.workload || 0) > 0
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {(evaluator.workload || 0) > 0 ? 'Active' : 'Available'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleDeleteEvaluator(evaluator)}
                                className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                            No evaluators found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Create Modal */}
            {showCreateModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Create Evaluator</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={newEvaluator.name}
                        onChange={(e) =>
                          setNewEvaluator({ ...newEvaluator, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={newEvaluator.email}
                        onChange={(e) =>
                          setNewEvaluator({ ...newEvaluator, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        value={newEvaluator.password}
                        onChange={(e) =>
                          setNewEvaluator({ ...newEvaluator, password: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="Enter password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        value={newEvaluator.department}
                        onChange={(e) =>
                          setNewEvaluator({ ...newEvaluator, department: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="Enter department"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        setShowCreateModal(false)
                        setNewEvaluator({ name: '', email: '', password: '', department: '' })
                      }}
                      disabled={creating}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition font-medium text-slate-700 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateEvaluator}
                      disabled={creating}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
                    >
                      {creating ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
