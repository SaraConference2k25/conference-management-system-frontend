'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentIcon, UploadIcon, AlertIcon } from '@/components/Icons'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { DashboardPageSkeleton } from '@/components/ui/loading-skeletons'
import { toast } from 'sonner'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { participantNav } from '@/components/dashboard/navConfig'

export default function UploadPaperPage() {
  const router = useRouter()
  const { user: authUser, isLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login')
    }
  }, [authUser, isLoading, router])

  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    department: '',
    file: null as File | null,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type) && !['pdf', 'doc', 'docx'].includes(file.name.split('.').pop()?.toLowerCase() || '')) {
        setErrors(prev => ({ ...prev, file: 'Only PDF and DOCX files are supported' }))
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'File size must be less than 10MB' }))
        return
      }
      setFormData(prev => ({ ...prev, file }))
      setErrors(prev => ({ ...prev, file: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!formData.title.trim()) newErrors.title = 'Paper title is required'
    if (!formData.abstract.trim()) newErrors.abstract = 'Abstract is required'
    if (!formData.department.trim()) newErrors.department = 'Department is required'
    if (!formData.file) newErrors.file = 'Paper file is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const submitFormData = new FormData()
      submitFormData.append('name', authUser?.fullName || authUser?.email || '')
      submitFormData.append('email', authUser?.email || '')
      submitFormData.append('contactNo', '9876543210') // TODO: Add contact number field
      submitFormData.append('department', formData.department)
      submitFormData.append('collegeName', 'Saranathan College of Engineering') // TODO: Add college name field
      submitFormData.append('paperTitle', formData.title)
      submitFormData.append('paperAbstract', formData.abstract)
      if (formData.file) {
        submitFormData.append('paperFile', formData.file)
      }

      await apiClient.submitPaper(submitFormData)
      toast.success('Paper submitted successfully! Redirecting...')

      setTimeout(() => {
        router.push('/dashboard/my-papers')
      }, 2000)
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit paper')
      setErrors({
        submit: error.message || 'Failed to submit paper. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    apiClient.logout()
    router.push('/login')
  }

  if (isLoading) {
    return <DashboardPageSkeleton />
  }

  return (
    <DashboardShell roleLabel="Participant" navItems={participantNav} user={authUser} onLogout={handleLogout}>
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">Submit Your Paper</h2>
        <p className="text-slate-500 text-sm">
          Fill in the details below and upload your research paper for conference review
        </p>
      </div>

      <div className="max-w-3xl">
        {/* Submission Error */}
        {errors.submit && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 mb-6 bg-red-50 border-red-100 flex items-start gap-3">
            <AlertIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 text-sm">Submission Failed</h3>
              <p className="text-red-700 text-sm mt-0.5">{errors.submit}</p>
            </div>
          </div>
        )}

        {/* Info Alert */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 mb-6 bg-blue-50/50 border-blue-100 flex items-start gap-3">
          <AlertIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Submission Guidelines</h3>
            <ul className="text-slate-600 text-sm mt-1.5 space-y-1 list-disc list-inside">
              <li>Paper must be in PDF or DOCX format</li>
              <li>Maximum file size: 10MB</li>
              <li>Include a clear abstract (250-300 words)</li>
              <li>Provide relevant keywords for categorization</li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Title Field */}
            <div>
              <label className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Paper Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter the title of your research paper"
                className={`w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 ${errors.title ? 'border-red-400' : ''}`}
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Keywords Field */}
            <div>
              <label className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Keywords (comma-separated)</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="e.g., Machine Learning, AI, Data Science"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
            </div>

            {/* Abstract Field */}
            <div>
              <label className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Abstract *</label>
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleInputChange}
                placeholder="Provide a concise abstract of your research (250-300 words recommended)"
                rows={6}
                className={`w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 resize-none ${errors.abstract ? 'border-red-400' : ''}`}
              />
              {errors.abstract && <p className="text-red-600 text-sm mt-1">{errors.abstract}</p>}
            </div>

            {/* Department Field */}
            <div>
              <label className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science, Engineering"
                className={`w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 ${errors.department ? 'border-red-400' : ''}`}
              />
              {errors.department && <p className="text-red-600 text-sm mt-1">{errors.department}</p>}
            </div>

            {/* File Upload Field */}
            <div>
              <label className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Upload Paper (PDF or DOCX) *</label>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                errors.file
                  ? 'border-red-300 bg-red-50/50'
                  : 'border-slate-300 bg-slate-50 hover:border-blue-400'
              }`}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer block">
                  <UploadIcon className="w-10 h-10 mx-auto mb-3 text-slate-400" />
                  {formData.file ? (
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{formData.file.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Drag and drop your file here</p>
                      <p className="text-xs text-slate-500 mt-1">or click to browse (PDF or DOCX, max 10MB)</p>
                    </div>
                  )}
                </label>
              </div>
              {errors.file && <p className="text-red-600 text-sm mt-1">{errors.file}</p>}
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-transparent px-5 py-2.5 text-sm font-medium text-blue-800 transition-colors hover:border-blue-200 hover:bg-blue-50 flex-1">
                Cancel
              </Link>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium leading-5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 flex-1 disabled:opacity-60 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <DocumentIcon className="w-4 h-4" />
                    Submit Paper
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardShell>
  )
}
