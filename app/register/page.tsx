'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/lib/toast-context'
import { EnvelopeIcon, UserIcon, LockClosedIcon, EyeIcon, EyeOffIcon, CheckCircleIcon, DocumentIcon, TrendingUpIcon } from '@/components/Icons'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading: authLoading } = useAuth()
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    affiliation: '',
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions.')
      return
    }

    setIsLoading(true)

    try {
      // Register with PARTICIPANT role as default
      await register(formData.email, formData.password, formData.fullName, formData.affiliation)

      setSuccess('Account created successfully! Redirecting to login...')
      addToast('Account created successfully!', 'success', 3000)

      setTimeout(() => {
        router.push('/login?registered=true')
      }, 2000)
    } catch (err: any) {
      console.error('Registration error:', err)
      const errorMessage = err?.data?.message || err?.message || 'Registration failed. Please try again.'
      setError(errorMessage)
      addToast(errorMessage, 'error', 4000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Register Form */}
          <div className="w-full">
            <div className="relative">
              {/* Back Button */}
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Login
              </Link>

              {/* Form Card */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-[linear-gradient(135deg,#0f172a_0%,#1e3a5f_50%,#1e40af_100%)] px-6 sm:px-8 py-8">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-1">Create account</h1>
                  <p className="text-blue-200/80 text-sm">Join the SARA 2026 Conference community</p>
                </div>

                {/* Form Content */}
                <div className="px-6 sm:px-8 py-8">
                  {/* Error Message */}
                  {error && (
                    <div className="mb-5 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-800 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="mb-5 p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-emerald-800 text-sm font-medium">{success}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name Field */}
                    <div>
                      <label htmlFor="fullName" className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Full Name *</label>
                      <div className="relative">
                        <UserIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 pl-11"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Email Address *</label>
                      <div className="relative">
                        <EnvelopeIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 pl-11"
                          required
                        />
                      </div>
                    </div>

                    {/* Affiliation Field */}
                    <div>
                      <label htmlFor="affiliation" className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Institution / Organization</label>
                      <input
                        id="affiliation"
                        name="affiliation"
                        type="text"
                        value={formData.affiliation}
                        onChange={handleChange}
                        placeholder="Your Institution"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Password *</label>
                      <div className="relative">
                        <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Min. 6 characters"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 pl-11 pr-11"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label htmlFor="confirmPassword" className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Confirm Password *</label>
                      <div className="relative">
                        <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 pl-11 pr-11"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="w-4 h-4 rounded accent-blue-700 cursor-pointer mt-0.5 flex-shrink-0"
                        required
                      />
                      <label htmlFor="agreeTerms" className="text-sm text-slate-600 cursor-pointer">
                        I agree to the{' '}
                        <Link href="/terms" className="text-blue-700 hover:text-blue-800 font-medium">
                          Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-blue-700 hover:text-blue-800 font-medium">
                          Privacy Policy
                        </Link>{' '}
                        *
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || authLoading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading || authLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Creating account...
                        </span>
                      ) : (
                        'Create my account'
                      )}
                    </button>

                    {/* Login Link */}
                    <div className="text-center pt-4 border-t border-slate-100">
                      <p className="text-sm text-slate-500">
                        Already part of our community?{' '}
                        <Link href="/login" className="text-blue-700 hover:text-blue-800 font-medium transition-colors">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Showcase */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-8">
              <div className="relative">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-md mb-6">
                  <span className="text-xs font-medium text-blue-800 tracking-wide">SARA 2026</span>
                </div>

                <h2 className="text-2xl font-semibold text-slate-900 mb-3">Join Our Community</h2>

                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Become part of the academic excellence journey at Saranathan College of Engineering. Submit papers, track reviews, and stay updated.
                </p>

                {/* Benefits Cards */}
                <div className="space-y-4">
                  {[
                    { icon: CheckCircleIcon, title: 'Easy Setup', desc: 'Complete registration in seconds' },
                    { icon: DocumentIcon, title: 'Exclusive Access', desc: 'Access papers, presentations & more' },
                    { icon: TrendingUpIcon, title: 'Community', desc: 'Connect with researchers worldwide' },
                  ].map((benefit, idx) => {
                    const BenefitIcon = benefit.icon
                    return (
                      <div key={idx} className="flex gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                        <BenefitIcon className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-slate-900 text-sm">{benefit.title}</h4>
                          <p className="text-slate-500 text-xs mt-0.5">{benefit.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Conference Info */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
                  {[
                    { number: '500+', label: 'Participants' },
                    { number: '100+', label: 'Papers' },
                    { number: 'Apr 3–4', label: 'Dates' },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xl font-semibold text-slate-900 tabular-nums">{stat.number}</div>
                      <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
