'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentIcon, DownloadIcon, MenuIcon, XIcon, ExitIcon, EyeIcon, CheckIcon, AlertIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
import { getInitials, getDisplayName } from '@/lib/utils/avatar'
import { toast } from 'sonner' 

interface Paper {
  paperId: string
  id?: string
  name: string
  email: string
  contactNo: string
  department: string
  collegeName: string
  paperTitle: string
  paperAbstract: string
  paperFileName: string
  paperFileUrl?: string
  submittedAt?: string
  status?: string
  evaluatorComments?: string
  evaluatorName?: string
  toggleStatus?: string
}

function EvaluatePapersContent() {
  const router = useRouter()
  const { user: authUser, isLoading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(null)
  const [papers, setPapers] = useState<Paper[]>([])
  const [papersLoading, setPapersLoading] = useState(true)
  const [papersError, setPapersError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date-newest')
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [paperFeedback, setPaperFeedback] = useState<{ [key: string]: string }>({})
  const [paperDecisions, setPaperDecisions] = useState<{ [key: string]: string }>({})
  const [savingId, setSavingId] = useState<string | null>(null)
  const [submittingId, setSubmittingId] = useState<string | null>(null)
  const [savedComments, setSavedComments] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login')
    }
  }, [authUser, isLoading, router])

  // Fetch papers for evaluation
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setPapersLoading(true)
        const allPapers = await apiClient.getAllPapers()
        setPapers(allPapers || [])
        setPapersError(null)

        // Initialize feedback and decisions from existing data
        const feedbackState: { [key: string]: string } = {}
        const decisionsState: { [key: string]: string } = {}
        const savedCommentsState: { [key: string]: string } = {}

        allPapers?.forEach((paper: Paper) => {
          const paperId = paper.paperId || paper.id
          
          if (!paperId) return
          
          // Load existing evaluator comments
          if (paper.evaluatorComments) {
            feedbackState[paperId] = paper.evaluatorComments
            savedCommentsState[paperId] = new Date().toLocaleString()
          }

          // Load existing toggle status (decision)
          if (paper.toggleStatus) {
            decisionsState[paperId] = paper.toggleStatus
          }
        })

        setPaperFeedback(feedbackState)
        setPaperDecisions(decisionsState)
        setSavedComments(savedCommentsState)
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch papers')
        setPapersError(error.message || 'Failed to fetch papers')
        setPapers([])
      } finally {
        setPapersLoading(false)
      }
    }

    if (authUser?.email) {
      fetchPapers()
    }
  }, [authUser?.email])

  const handleLogout = () => {
    apiClient.logout()
    router.push('/login')
  }

  const handleDownloadPaper = (paperFileUrl: string, paperFileName: string) => {
    try {
      setDownloadingId(paperFileUrl)
      const link = document.createElement('a')
      link.href = paperFileUrl
      link.download = paperFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => toast.success('Download started'), 500)
    } catch (error: any) {
      toast.error('Failed to download paper')
    } finally {
      setDownloadingId(null)
    }
  }

  const handleFeedbackChange = (paperId: string, feedback: string) => {
    setPaperFeedback(prev => ({
      ...prev,
      [paperId]: feedback
    }))
  }

  const handleDecisionChange = (paperId: string, decision: string) => {
    setPaperDecisions(prev => ({
      ...prev,
      [paperId]: decision
    }))
  }

  const handleSaveEvaluation = async (paper: Paper) => {
    const paperId = paper.paperId || paper.id
    
    if (!paperId) {
      toast.error('Paper ID is missing')
      return
    }
    
    const feedback = paperFeedback[paperId]
    const decision = paperDecisions[paperId]

    if (!feedback?.trim()) {
      toast.warning('Please provide comments before saving')
      return
    }

    if (!decision) {
      toast.warning('Please select an evaluation decision before saving')
      return
    }

    try {
      setSavingId(paperId)
      
      // Call API to save review comments with decision
      await apiClient.saveReviewComments(paperId, feedback, decision)
      
      setSavedComments(prev => ({
        ...prev,
        [paperId]: new Date().toLocaleString()
      }))
      
      toast.success('Evaluation saved successfully!')
    } catch (error: any) {
      toast.error('Failed to save evaluation: ' + error.message)
    } finally {
      setSavingId(null)
    }
  }

  const handleSubmitEvaluation = async (paper: Paper) => {
    const paperId = paper.paperId || paper.id
    
    if (!paperId) {
      toast.error('Paper ID is missing')
      return
    }
    
    const feedback = paperFeedback[paperId]
    const decision = paperDecisions[paperId]

    if (!feedback?.trim()) {
      toast.warning('Please provide comments before submitting')
      return
    }

    if (!decision) {
      toast.warning('Please select an evaluation decision before submitting')
      return
    }

    try {
      setSubmittingId(paperId)
      
      // Map frontend decision values to backend enum values
      const statusMap: { [key: string]: string } = {
        'accept-minor': 'ACCEPTED',
        'accept-major': 'ACCEPTED',
        'reject': 'REJECTED'
      }
      
      const backendStatus = statusMap[decision] || decision.toUpperCase()
      
      // Submit the evaluation with only required fields from PaperSubmissionRequest
      const evaluationRequest = {
        paperId: paperId,
        paperTitle: paper.paperTitle,
        paperAbstract: paper.paperAbstract,
        department: paper.department,
        collegeName: paper.collegeName,
        evaluatorComments: feedback,
        status: backendStatus
      }
      
      await apiClient.evaluatePaper(evaluationRequest)
      
      toast.success('Evaluation submitted successfully!')
      
      // Optionally refresh the papers list
      setPapers(papers.map(p => 
        (p.paperId || p.id) === paperId 
          ? { ...p, toggleStatus: decision, evaluatorComments: feedback }
          : p
      ))
    } catch (error: any) {
      toast.error('Error submitting evaluation: ' + (error.message || 'Unknown error'))
    } finally {
      setSubmittingId(null)
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
      case 'REJECTED':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700'
      case 'PENDING_ASSIGNMENT':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700'
      case 'UNDER_REVIEW':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
    }
  }

  const getStatusLabel = (status?: string) => {
    if (!status) return 'Unknown'
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  // Filter papers
  const filteredPapers = papers.filter(paper => {
    const query = searchQuery.toLowerCase()
    return !query || 
      paper.paperTitle.toLowerCase().includes(query) ||
      paper.name.toLowerCase().includes(query) ||
      paper.department.toLowerCase().includes(query)
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date-newest':
        return new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
      case 'date-oldest':
        return new Date(a.submittedAt || 0).getTime() - new Date(b.submittedAt || 0).getTime()
      case 'title-asc':
        return a.paperTitle.localeCompare(b.paperTitle)
      case 'title-desc':
        return b.paperTitle.localeCompare(a.paperTitle)
      case 'author-asc':
        return a.name.localeCompare(b.name)
      case 'author-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

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
                <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  Evaluate Papers
                </h1>
                <p className="text-blue-100 text-xs sm:text-sm">Review submitted papers</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs sm:text-sm font-semibold text-blue-50 line-clamp-1">
                  {getDisplayName(authUser?.fullName, authUser?.email)}
                </span>
                <span className="text-xs text-blue-100">
                  Evaluator
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
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <nav className="absolute left-0 top-16 right-0 bg-white dark:bg-gray-800 shadow-lg">
            <div className="p-4 space-y-2">
              <Link
                href="/dashboard/evaluator"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-semibold border-l-4 border-transparent"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/evaluator/evaluate-papers"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors font-semibold border-l-4 border-blue-600"
              >
                Evaluate Papers
              </Link>
            </div>
          </nav>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-0 md:gap-0 min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <nav className="sticky top-20 p-6 space-y-2">
            <Link
              href="/dashboard/evaluator"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-semibold border-l-4 border-transparent"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/evaluator/evaluate-papers"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors font-semibold border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20"
            >
              Evaluate Papers
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
              Paper Evaluation
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Review and evaluate submitted papers. Provide constructive feedback to help authors improve their work.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex-1 relative">
              <EyeIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by title, author, department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Sort:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="date-newest">Newest First</option>
                <option value="date-oldest">Oldest First</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="author-asc">Author (A-Z)</option>
                <option value="author-desc">Author (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {papersLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading papers for evaluation...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {papersError && !papersLoading && (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl mb-6">
              <h3 className="font-bold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                <AlertIcon className="w-5 h-5" />
                Error Loading Papers
              </h3>
              <p className="text-red-800 dark:text-red-200 text-sm">{papersError}</p>
            </div>
          )}

          {/* Empty State */}
          {!papersLoading && !papersError && papers.length === 0 && (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <DocumentIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Papers Available</h3>
              <p className="text-gray-600 dark:text-gray-400">No papers have been assigned for evaluation yet.</p>
            </div>
          )}

          {/* Papers List */}
          {!papersLoading && !papersError && papers.length > 0 && (
            <div className="space-y-4">
              {filteredPapers.map(paper => {
                const paperId = paper.paperId || paper.id
                const isExpanded = expandedPaperId === paperId

                return (
                  <div
                    key={paperId}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Card Header */}
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      onClick={() => setExpandedPaperId(isExpanded ? null : (paperId || null))}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-3">
                            <DocumentIcon className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                                Paper ID: {paperId}
                              </p>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white break-words">
                                {paper.paperTitle}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 ml-9">
                            By {paper.name} • {paper.submittedAt ? new Date(paper.submittedAt).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap border ${getStatusColor(paper.status)}`}>
                            {getStatusLabel(paper.status)}
                          </span>
                          <button
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg
                              className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-6">
                        {/* Paper Details */}
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Paper Information</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Title</p>
                              <p className="text-gray-900 dark:text-white">{paper.paperTitle}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Author</p>
                              <p className="text-gray-900 dark:text-white">{paper.name}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Department</p>
                              <p className="text-gray-900 dark:text-white">{paper.department}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Email</p>
                              <p className="text-gray-900 dark:text-white break-all">{paper.email}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Contact</p>
                              <p className="text-gray-900 dark:text-white">{paper.contactNo}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">College</p>
                              <p className="text-gray-900 dark:text-white">{paper.collegeName}</p>
                            </div>
                          </div>
                        </div>

                        {/* Abstract */}
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Abstract</h4>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            {paper.paperAbstract}
                          </p>
                        </div>

                        {/* Evaluation Section */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Your Evaluation</h4>

                          {/* Decision Radio Buttons */}
                          <div className="mb-6">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Decision</p>
                            <div className="space-y-3">
                              {[
                                { value: 'accept-minor', label: 'Accept with minor changes' },
                                { value: 'accept-major', label: 'Accept with major changes' },
                                { value: 'reject', label: 'Reject' }
                              ].map(option => (
                                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`decision-${paperId}`}
                                    value={option.value}
                                    checked={paperDecisions[paperId] === option.value}
                                    onChange={(e) => handleDecisionChange(paperId, e.target.value)}
                                    className="w-4 h-4 text-blue-600 cursor-pointer"
                                  />
                                  <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Comments Textarea */}
                          <div>
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-3">
                              Comments & Feedback
                            </label>
                            <textarea
                              value={paperFeedback[paperId] || ''}
                              onChange={(e) => handleFeedbackChange(paperId, e.target.value)}
                              placeholder="Provide detailed feedback and comments for the author..."
                              className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                          </div>

                          {/* Save Button */}
                          <div className="mt-4 flex flex-col items-center gap-2">
                            <button
                              onClick={() => handleSaveEvaluation(paper)}
                              disabled={
                                !paperDecisions[paperId] || 
                                !paperFeedback[paperId]?.trim() ||
                                savingId === paperId ||
                                paper.status?.toUpperCase() === 'ACCEPTED'
                              }
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                            >
                              {savingId === paperId ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <CheckIcon className="w-3.5 h-3.5" />
                                  Save
                                </>
                              )}
                            </button>
                            
                            {/* Submit and Download Buttons Side by Side */}
                            <div className="flex gap-2 items-center">
                              <button
                                onClick={() => handleSubmitEvaluation(paper)}
                                disabled={
                                  !paperDecisions[paperId] || 
                                  !paperFeedback[paperId]?.trim() ||
                                  submittingId === paperId ||
                                  paper.status?.toUpperCase() === 'ACCEPTED'
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                              >
                                {submittingId === paperId ? (
                                  <>
                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting...
                                  </>
                                ) : (
                                  <>
                                    <CheckIcon className="w-3.5 h-3.5" />
                                    Submit
                                  </>
                                )}
                              </button>
                              
                              <button
                                onClick={() => handleDownloadPaper(paper.paperFileUrl || '', paper.paperFileName)}
                                disabled={downloadingId === paper.paperFileUrl || paper.status?.toUpperCase() === 'ACCEPTED'}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                              >
                                <DownloadIcon className="w-3.5 h-3.5" />
                                {downloadingId === paper.paperFileUrl ? 'Downloading...' : 'Download'}
                              </button>
                            </div>
                            
                            {savedComments[paperId] && (
                              <div className="flex items-center justify-center gap-2 text-sm text-green-700 dark:text-green-300 mt-2">
                                <CheckIcon className="w-4 h-4" />
                                Saved
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function EvaluatePapersPage() {
  return (
    <ProtectedRoute requiredRole="evaluator">
      <EvaluatePapersContent />
    </ProtectedRoute>
  )
}
