'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DocumentIcon, MenuIcon, XIcon, LogOutIcon, UploadIcon, AlertIcon, CheckIcon } from '@/components/Icons'

export default function UploadPaperPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user] = useState({ name: 'John Doe', email: 'participant@sara2025.ac.in' })
  const [isLoading, setIsLoading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

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

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setUploadSuccess(true)
    setIsLoading(false)

    setTimeout(() => {
      router.push('/dashboard/my-papers')
    }, 2000)
  }

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
                <p className="text-xs text-blue-100 font-medium">Upload Paper</p>
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
            <Link href="/dashboard/upload" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors font-semibold border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20">
              Upload Paper
            </Link>
            <Link href="/dashboard/my-papers" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-semibold border-l-4 border-transparent">
              My Papers
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8">
          {uploadSuccess && (
            <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-4">
              <CheckIcon className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-900 dark:text-green-100">Paper Submitted Successfully!</h3>
                <p className="text-green-800 dark:text-green-200 text-sm mt-1">Your paper has been submitted for review. Redirecting to My Papers...</p>
              </div>
            </div>
          )}

          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
              Submit Your Paper
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fill in the details below and upload your research paper for conference review
            </p>
          </div>

          {/* Info Alert */}
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl flex items-start gap-4">
            <AlertIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-100">Submission Guidelines</h3>
              <ul className="text-blue-800 dark:text-blue-200 text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Paper must be in PDF or DOCX format</li>
                <li>Maximum file size: 10MB</li>
                <li>Include a clear abstract (250-300 words)</li>
                <li>Provide relevant keywords for categorization</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                  Paper Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter the title of your research paper"
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.title && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Keywords Field */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="e.g., Machine Learning, AI, Data Science"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Abstract Field */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                  Abstract *
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  placeholder="Provide a concise abstract of your research (250-300 words recommended)"
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                    errors.abstract ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.abstract && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.abstract}</p>}
              </div>

              {/* Department Field */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science, Engineering"
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.department && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.department}</p>}
              </div>

              {/* File Upload Field */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                  Upload Paper (PDF or DOCX) *
                </label>
                <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  errors.file
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/10'
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-500 dark:hover:border-blue-400'
                }`}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    <UploadIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    {formData.file ? (
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{formData.file.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">Drag and drop your file here</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">or click to browse (PDF or DOCX, max 10MB)</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.file && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.file}</p>}
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-6">
                <Link
                  href="/dashboard"
                  className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-bold transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <DocumentIcon className="w-5 h-5" />
                      Submit Paper
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
