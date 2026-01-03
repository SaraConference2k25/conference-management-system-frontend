'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentIcon, DownloadIcon, TrashIcon, ChevronDownIcon, MenuIcon, XIcon, LogOutIcon } from '@/components/Icons'

interface Paper {
  id: string
  title: string
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected'
  submittedDate: string
  score?: number
  feedback?: string
}

export default function MyPapersPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [user] = useState({ name: 'John Doe', email: 'participant@sara2025.ac.in' })

  const [papers] = useState<Paper[]>([
    {
      id: 'P001',
      title: 'Advanced Machine Learning Techniques in Neural Networks',
      status: 'accepted',
      submittedDate: '2025-12-15',
      score: 92,
      feedback: 'Excellent research with innovative approach to deep learning optimization.',
    },
    {
      id: 'P002',
      title: 'IoT Applications in Smart City Infrastructure',
      status: 'under_review',
      submittedDate: '2025-12-20',
    },
    {
      id: 'P003',
      title: 'Blockchain Security in Distributed Systems',
      status: 'submitted',
      submittedDate: '2025-12-25',
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800', badge: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' }
      case 'under_review':
        return { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800', badge: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200' }
      case 'rejected':
        return { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800', badge: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' }
      default:
        return { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800', badge: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' }
    }
  }

  const getStatusLabel = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const filteredPapers = activeFilter === 'all' ? papers : papers.filter(p => p.status === activeFilter)

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-950 dark:via-indigo-950 dark:to-gray-950 shadow-lg border-b border-blue-800 dark:border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-blue-500/50 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-6 h-6 text-white" />
                ) : (
                  <MenuIcon className="w-6 h-6 text-white" />
                )}
              </button>
              <div className="flex flex-col">
                <h1 className="text-3xl font-black text-white tracking-tight">
                  SARA 2025
                </h1>
                <p className="text-xs text-blue-100 font-medium">My Papers</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-blue-50">
                  {user.name}
                </span>
                <span className="text-xs text-blue-100">
                  Participant
                </span>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/20 dark:bg-blue-400/20 flex items-center justify-center border border-white/30">
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg font-semibold transition-all text-sm shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <LogOutIcon className="w-4 h-4" />
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
            <Link href="/dashboard" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/dashboard/upload" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium">
              Upload Paper
            </Link>
            <Link href="/dashboard/my-papers" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium">
              My Papers
            </Link>
          </nav>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <nav className="sticky top-20 p-6 space-y-2">
            <Link href="/dashboard" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-semibold border-l-4 border-transparent">
              Dashboard
            </Link>
            <Link href="/dashboard/upload" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-semibold border-l-4 border-transparent">
              Upload Paper
            </Link>
            <Link href="/dashboard/my-papers" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors font-semibold border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20">
              My Papers
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8">
          {/* Page Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                My Submitted Papers
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Track the status and progress of your research submissions
              </p>
            </div>
            <Link href="/dashboard/upload" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors">
              <DocumentIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Submit Paper</span>
            </Link>
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {['all', 'submitted', 'under_review', 'accepted', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeFilter === status
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-600'
                }`}
              >
                {getStatusLabel(status)}
              </button>
            ))}
          </div>

          {/* Papers List */}
          <div className="space-y-4">
            {filteredPapers.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <DocumentIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Papers Found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {filteredPapers.length === 0 && papers.length > 0
                    ? 'No papers match the selected status.'
                    : 'You haven\'t submitted any papers yet.'}
                </p>
                <Link href="/dashboard/upload" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors">
                  Submit Your First Paper
                </Link>
              </div>
            ) : (
              filteredPapers.map(paper => {
                const colors = getStatusColor(paper.status)
                return (
                  <div
                    key={paper.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl border ${colors.border} overflow-hidden hover:shadow-lg transition-shadow`}
                  >
                    {/* Card Header */}
                    <div className="p-6 cursor-pointer" onClick={() => setExpandedPaperId(expandedPaperId === paper.id ? null : paper.id)}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <DocumentIcon className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                              {paper.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Submitted on {new Date(paper.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.badge}`}>
                            {getStatusLabel(paper.status)}
                          </span>
                          <button
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ChevronDownIcon className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${expandedPaperId === paper.id ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedPaperId === paper.id && (
                      <div className={`border-t ${colors.border} p-6 space-y-6`}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Paper ID</p>
                            <p className="text-gray-900 dark:text-white font-mono">{paper.id}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Submitted</p>
                            <p className="text-gray-900 dark:text-white">{new Date(paper.submittedDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Status</p>
                            <p className="text-gray-900 dark:text-white">{getStatusLabel(paper.status)}</p>
                          </div>
                        </div>

                        {paper.status === 'accepted' && paper.score !== undefined && (
                          <div className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Evaluation Score</p>
                              <span className="text-3xl font-black text-gray-900 dark:text-white">{paper.score}/100</span>
                            </div>
                            {paper.feedback && (
                              <div className="mt-4">
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Reviewer Feedback</p>
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{paper.feedback}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                            <DownloadIcon className="w-4 h-4" />
                            Download
                          </button>
                          <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg font-semibold transition-colors">
                            <TrashIcon className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
