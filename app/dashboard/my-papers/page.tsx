'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentIcon, DownloadIcon, TrashIcon, ChevronDownIcon, MenuIcon, XIcon, ExitIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { getInitials, getDisplayName } from '@/lib/utils/avatar'
import { toast } from 'sonner' 

interface Paper {
  id: string
  paperId?: string
  title: string
  paperTitle?: string
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected'
  submittedDate: string
  score?: number
  feedback?: string
  paperFileUrl?: string
  paperFileName?: string
}

export default function MyPapersPage() {
  const router = useRouter()
  const { user: authUser, isLoading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login')
    }
  }, [authUser, isLoading, router])

  // Fetch papers from backend
  const [papers, setPapers] = useState<any[]>([])
  const [papersLoading, setPapersLoading] = useState(true)
  const [papersError, setPapersError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        if (!authUser?.email) return
        
        const userPapers = await apiClient.getPapersByEmail(authUser.email)
        setPapers(userPapers || [])
        setPapersError(null)
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch papers')
        setPapersError(error.message || 'Failed to fetch papers')
        setPapers([])
      } finally {
        setPapersLoading(false)
      }
    }

    fetchPapers()
  }, [authUser?.email])

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
    apiClient.logout()
    router.push('/login')
  }

  const handleDownloadPaper = (paperFileUrl: string, paperFileName: string) => {
    try {
      setDownloadingId(paperFileUrl)
      setDownloadError(null)
      const link = document.createElement('a')
      link.href = paperFileUrl
      link.download = paperFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('Download started')
    } catch (error: any) {
      toast.error(error.message || 'Failed to download paper')
      setDownloadError(error.message || 'Failed to download paper')
    } finally {
      setDownloadingId(null)
    }
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
                <p className="text-xs sm:text-sm text-blue-100 font-medium">My Papers</p>
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

          {/* Loading State */}
          {papersLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading your papers...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {papersError && !papersLoading && (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <h3 className="font-bold text-red-900 dark:text-red-100 mb-2">Error Loading Papers</h3>
              <p className="text-red-800 dark:text-red-200 text-sm">{papersError}</p>
            </div>
          )}

          {/* Papers List */}
          <div className="space-y-4">
            {filteredPapers.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <DocumentIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {papers.length === 0 ? 'No Papers Submitted' : 'No Papers Found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {papers.length > 0
                    ? 'No papers match the selected status.'
                    : 'You haven\'t submitted any papers yet.'}
                </p>
                {papers.length === 0 && (
                  <Link href="/dashboard/upload" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors">
                    <DocumentIcon className="w-5 h-5" />
                    Submit Your First Paper
                  </Link>
                )}
              </div>
            ) : (
              filteredPapers.map(paper => {
                const colors = getStatusColor(paper.status)
                return (
                  <div
                    key={paper.paperId || paper.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl border ${colors.border} overflow-hidden hover:shadow-lg transition-shadow`}
                  >
                    {/* Card Header */}
                    <div className="p-6 cursor-pointer" onClick={() => setExpandedPaperId(expandedPaperId === (paper.paperId || paper.id) ? null : (paper.paperId || paper.id))}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Paper ID and Title */}
                          <div className="flex items-start gap-3 mb-3">
                            <DocumentIcon className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Paper ID: {paper.paperId || paper.id}</p>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white break-words">
                                {paper.paperTitle || 'Untitled Paper'}
                              </h3>
                            </div>
                          </div>
                          {/* Submission Date */}
                          <p className="text-sm text-gray-600 dark:text-gray-400 ml-9">
                            Submitted on {paper.submittedAt ? new Date(paper.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Invalid Date'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${colors.badge}`}>
                            {getStatusLabel(paper.status)}
                          </span>
                          <button
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ChevronDownIcon className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${expandedPaperId === (paper.paperId || paper.id) ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedPaperId === (paper.paperId || paper.id) && (
                      <div className={`border-t ${colors.border} p-6 space-y-6`}>
                        {/* Paper Details Grid */}
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Paper Information</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Paper ID</p>
                              <p className="text-gray-900 dark:text-white font-mono text-sm">{paper.paperId || paper.id}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Submitted Date</p>
                              <p className="text-gray-900 dark:text-white text-sm">{paper.submittedAt ? new Date(paper.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Status</p>
                              <p className="text-gray-900 dark:text-white text-sm">{getStatusLabel(paper.status)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Paper File</p>
                              <p className="text-gray-900 dark:text-white text-sm truncate">{paper.paperFileName}</p>
                            </div>
                          </div>
                        </div>

                        {/* Author Information */}
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Author Information</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Name</p>
                              <p className="text-gray-900 dark:text-white text-sm">{paper.name}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Email</p>
                              <p className="text-gray-900 dark:text-white text-sm break-all">{paper.email}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Contact Number</p>
                              <p className="text-gray-900 dark:text-white text-sm">{paper.contactNo}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Department</p>
                              <p className="text-gray-900 dark:text-white text-sm">{paper.department}</p>
                            </div>
                            <div className="sm:col-span-2">
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">College/Institution</p>
                              <p className="text-gray-900 dark:text-white text-sm">{paper.collegeName}</p>
                            </div>
                          </div>
                        </div>

                        {/* Paper Details */}
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Paper Content</h4>
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">Title</p>
                              <p className="text-gray-900 dark:text-white text-sm leading-relaxed">{paper.paperTitle}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">Abstract</p>
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-gray-50 dark:bg-gray-700/30 p-4 rounded">{paper.paperAbstract}</p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 flex-col space-y-3">
                          {downloadError && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                              <p className="text-red-700 dark:text-red-300 text-sm">{downloadError}</p>
                            </div>
                          )}
                          <div className="flex justify-end">
                            <button 
                              onClick={() => handleDownloadPaper(paper.paperFileUrl || '', paper.paperFileName || 'paper.pdf')}
                              disabled={downloadingId === paper.paperFileUrl}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                            >
                              <DownloadIcon className="w-3.5 h-3.5" />
                              {downloadingId === paper.paperFileUrl ? 'Downloading...' : 'Download'}
                            </button>
                          </div>
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
