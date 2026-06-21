'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DocumentIcon, DownloadIcon, EyeIcon, CheckIcon, AlertIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'
import { toast } from 'sonner'
import { PaperListSkeleton } from '@/components/ui/loading-skeletons'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { evaluatorNav } from '@/components/dashboard/navConfig'

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
        // Only fetch papers assigned to this evaluator using their email
        const allPapers = await apiClient.getPapersByEvaluator(authUser?.email || '')
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

  const statusBadgeClass = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
        return 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 bg-emerald-50 text-emerald-700'
      case 'REJECTED':
        return 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 bg-red-50 text-red-700'
      case 'PENDING_ASSIGNMENT':
        return 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 bg-amber-50 text-amber-700'
      case 'UNDER_REVIEW':
        return 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 bg-blue-50 text-blue-700'
      default:
        return 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 bg-slate-100 text-slate-600'
    }
  }

  const getStatusLabel = (status?: string) => {
    if (!status) return 'Unknown'
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
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
    <DashboardShell roleLabel="Evaluator" navItems={evaluatorNav} user={authUser} onLogout={handleLogout}>
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">Paper Evaluation</h2>
        <p className="text-slate-500 text-sm">
          Review and evaluate submitted papers. Provide constructive feedback to help authors improve their work.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <EyeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, author, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 sm:w-44"
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
      {papersLoading && <PaperListSkeleton count={4} />}

      {/* Error State */}
      {papersError && !papersLoading && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 mb-6 bg-red-50 border-red-100">
          <h3 className="font-semibold text-red-900 mb-1 flex items-center gap-2">
            <AlertIcon className="w-5 h-5" />
            Error Loading Papers
          </h3>
          <p className="text-red-700 text-sm">{papersError}</p>
        </div>
      )}

      {/* Empty State */}
      {!papersLoading && !papersError && papers.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm text-center py-16">
          <DocumentIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-1">No Papers Available</h3>
          <p className="text-sm text-slate-500">No papers have been assigned for evaluation yet.</p>
        </div>
      )}

      {/* Papers List */}
      {!papersLoading && !papersError && papers.length > 0 && (
        <div className="space-y-4">
          {filteredPapers.map(paper => {
            const paperId = paper.paperId || paper.id
            const isExpanded = expandedPaperId === paperId
            const isLocked = paper.status?.toUpperCase() === 'ACCEPTED'

            return (
              <div key={paperId} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                {/* Card Header */}
                <div
                  className="p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedPaperId(isExpanded ? null : (paperId || null))}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-9 h-9 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0">
                          <DocumentIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-0.5">
                            Paper ID: {paperId}
                          </p>
                          <h3 className="text-base font-semibold text-slate-900 break-words">
                            {paper.paperTitle}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 ml-12">
                        By {paper.name} • {paper.submittedAt ? new Date(paper.submittedAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={statusBadgeClass(paper.status)}>
                        {getStatusLabel(paper.status)}
                      </span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-5 space-y-6">
                    {/* Paper Details */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Paper Information</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                        {[
                          ['Title', paper.paperTitle],
                          ['Author', paper.name],
                          ['Department', paper.department],
                          ['Email', paper.email],
                          ['Contact', paper.contactNo],
                          ['College', paper.collegeName],
                        ].map(([label, value]) => (
                          <div key={label}>
                            <p className="text-xs font-medium text-slate-400 mb-0.5 uppercase tracking-wide">{label}</p>
                            <p className="text-sm text-slate-900 break-words">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Abstract */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Abstract</h4>
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg">
                        {paper.paperAbstract}
                      </p>
                    </div>

                    {/* Evaluation Section */}
                    <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-5">
                      <h4 className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wide">Your Evaluation</h4>

                      {/* Decision Radio Buttons */}
                      <div className="mb-5">
                        <p className="text-sm font-medium text-slate-700 mb-2">Decision</p>
                        <div className="space-y-2">
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
                                className="w-4 h-4 text-blue-600 cursor-pointer accent-blue-700"
                              />
                              <span className="text-sm text-slate-700">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Comments Textarea */}
                      <div>
                        <label className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Comments &amp; Feedback</label>
                        <textarea
                          value={paperFeedback[paperId] || ''}
                          onChange={(e) => handleFeedbackChange(paperId, e.target.value)}
                          placeholder="Provide detailed feedback and comments for the author..."
                          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 h-32 resize-none"
                        />
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handleSaveEvaluation(paper)}
                          disabled={!paperDecisions[paperId] || !paperFeedback[paperId]?.trim() || savingId === paperId || isLocked}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium leading-5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 py-2 text-sm"
                        >
                          {savingId === paperId ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <CheckIcon className="w-3.5 h-3.5" />
                              Save
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleSubmitEvaluation(paper)}
                          disabled={!paperDecisions[paperId] || !paperFeedback[paperId]?.trim() || submittingId === paperId || isLocked}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {submittingId === paperId ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                          disabled={downloadingId === paper.paperFileUrl || isLocked}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-transparent px-5 py-2.5 text-sm font-medium text-blue-800 transition-colors hover:border-blue-200 hover:bg-blue-50 py-2 text-sm"
                        >
                          <DownloadIcon className="w-3.5 h-3.5" />
                          {downloadingId === paper.paperFileUrl ? 'Downloading...' : 'Download'}
                        </button>

                        {savedComments[paperId] && (
                          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 ml-1">
                            <CheckIcon className="w-4 h-4" />
                            Saved
                          </span>
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
    </DashboardShell>
  )
}

export default function EvaluatePapersPage() {
  return (
    <ProtectedRoute requiredRole="evaluator">
      <EvaluatePapersContent />
    </ProtectedRoute>
  )
}
