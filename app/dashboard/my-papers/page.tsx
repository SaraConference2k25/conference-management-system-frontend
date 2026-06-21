'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentIcon, DownloadIcon, ChevronDownIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import { DashboardPageSkeleton, PaperListSkeleton } from '@/components/ui/loading-skeletons'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { participantNav } from '@/components/dashboard/navConfig'

export default function MyPapersPage() {
  const router = useRouter()
  const { user: authUser, isLoading } = useAuth()
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

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'badge badge-green'
      case 'under_review':
        return 'badge badge-amber'
      case 'rejected':
        return 'badge badge-red'
      default:
        return 'badge badge-blue'
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

  if (isLoading) {
    return <DashboardPageSkeleton />
  }

  return (
    <DashboardShell roleLabel="Participant" navItems={participantNav} user={authUser} onLogout={handleLogout}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">My Submitted Papers</h2>
          <p className="text-slate-500 text-sm">Track the status and progress of your research submissions</p>
        </div>
        <Link href="/dashboard/upload" className="btn-primary">
          <DocumentIcon className="w-4 h-4" />
          Submit Paper
        </Link>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {['all', 'submitted', 'under_review', 'accepted', 'rejected'].map(status => (
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`px-3.5 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === status
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {getStatusLabel(status)}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {papersLoading && <PaperListSkeleton count={4} />}

      {/* Error State */}
      {papersError && !papersLoading && (
        <div className="card p-5 bg-red-50 border-red-100">
          <h3 className="font-semibold text-red-900 mb-1">Error Loading Papers</h3>
          <p className="text-red-700 text-sm">{papersError}</p>
        </div>
      )}

      {/* Papers List */}
      {!papersLoading && !papersError && (
        <div className="space-y-4">
          {filteredPapers.length === 0 ? (
            <div className="card text-center py-16">
              <DocumentIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {papers.length === 0 ? 'No Papers Submitted' : 'No Papers Found'}
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                {papers.length > 0
                  ? 'No papers match the selected status.'
                  : "You haven't submitted any papers yet."}
              </p>
              {papers.length === 0 && (
                <Link href="/dashboard/upload" className="btn-primary inline-flex">
                  <DocumentIcon className="w-4 h-4" />
                  Submit Your First Paper
                </Link>
              )}
            </div>
          ) : (
            filteredPapers.map(paper => {
              const paperKey = paper.paperId || paper.id
              const isExpanded = expandedPaperId === paperKey
              return (
                <div key={paperKey} className="card overflow-hidden">
                  {/* Card Header */}
                  <div
                    className="p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setExpandedPaperId(isExpanded ? null : paperKey)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-9 h-9 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0">
                            <DocumentIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-0.5">Paper ID: {paperKey}</p>
                            <h3 className="text-base font-semibold text-slate-900 break-words">
                              {paper.paperTitle || 'Untitled Paper'}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 ml-12">
                          Submitted on {paper.submittedAt ? new Date(paper.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={statusBadgeClass(paper.status)}>
                          {getStatusLabel(paper.status)}
                        </span>
                        <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 p-5 space-y-6">
                      {/* Paper Details Grid */}
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Paper Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-0.5 uppercase tracking-wide">Paper ID</p>
                            <p className="text-slate-900 font-mono text-sm">{paperKey}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-0.5 uppercase tracking-wide">Submitted Date</p>
                            <p className="text-slate-900 text-sm">{paper.submittedAt ? new Date(paper.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-0.5 uppercase tracking-wide">Status</p>
                            <p className="text-slate-900 text-sm">{getStatusLabel(paper.status)}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-0.5 uppercase tracking-wide">Paper File</p>
                            <p className="text-slate-900 text-sm truncate">{paper.paperFileName}</p>
                          </div>
                        </div>
                      </div>

                      {/* Author Information */}
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Author Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-0.5 uppercase tracking-wide">Name</p>
                            <p className="text-slate-900 text-sm">{paper.name}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-0.5 uppercase tracking-wide">Email</p>
                            <p className="text-slate-900 text-sm break-all">{paper.email}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-0.5 uppercase tracking-wide">Contact Number</p>
                            <p className="text-slate-900 text-sm">{paper.contactNo}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-0.5 uppercase tracking-wide">Department</p>
                            <p className="text-slate-900 text-sm">{paper.department}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="text-xs font-medium text-slate-400 mb-0.5 uppercase tracking-wide">College/Institution</p>
                            <p className="text-slate-900 text-sm">{paper.collegeName}</p>
                          </div>
                        </div>
                      </div>

                      {/* Paper Content */}
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Paper Content</h4>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wide">Title</p>
                            <p className="text-slate-900 text-sm leading-relaxed">{paper.paperTitle}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wide">Abstract</p>
                            <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-lg">{paper.paperAbstract}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        {downloadError && (
                          <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                            <p className="text-red-700 text-sm">{downloadError}</p>
                          </div>
                        )}
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleDownloadPaper(paper.paperFileUrl || '', paper.paperFileName || 'paper.pdf')}
                            disabled={downloadingId === paper.paperFileUrl}
                            className="btn-secondary py-2 text-sm"
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
      )}
    </DashboardShell>
  )
}
