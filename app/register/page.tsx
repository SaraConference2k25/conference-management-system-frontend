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
    <div className="auth-page flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_0.82fr] lg:gap-16">
          {/* Left Side - Register Form */}
          <div className="w-full">
            <div className="relative">
              {/* Back Button */}
              <Link
                href="/login"
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-900"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Login
              </Link>

              {/* Form Card */}
              <div className="auth-card">
                {/* Header */}
                <div className="auth-hero relative px-6 py-7 sm:px-8 sm:py-8">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full border-b border-l border-white/10" />
                  <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-blue-200">SARA 2026 conference portal</p>
                  <h1 className="mb-1 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">Create your account</h1>
                  <p className="text-sm text-blue-100/85">Your researcher profile starts here.</p>
                </div>

                {/* Form Content */}
                <div className="px-6 py-7 sm:px-8 sm:py-8">
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
                      <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-700">Full name <span className="text-blue-700">*</span></label>
                      <div className="relative">
                        <UserIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="auth-input px-3.5 py-3 pl-11 placeholder:text-slate-400"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email address <span className="text-blue-700">*</span></label>
                      <div className="relative">
                        <EnvelopeIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="auth-input px-3.5 py-3 pl-11 placeholder:text-slate-400"
                          required
                        />
                      </div>
                    </div>

                    {/* Affiliation Field */}
                    <div>
                      <label htmlFor="affiliation" className="mb-2 block text-sm font-semibold text-slate-700">Institution or organization <span className="font-normal text-slate-400">(optional)</span></label>
                      <input
                        id="affiliation"
                        name="affiliation"
                        type="text"
                        value={formData.affiliation}
                        onChange={handleChange}
                        placeholder="Your Institution"
                        className="auth-input px-3.5 py-3 placeholder:text-slate-400"
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Password <span className="text-blue-700">*</span></label>
                      <div className="relative">
                        <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Min. 6 characters"
                          className="auth-input px-3.5 py-3 pl-11 pr-11 placeholder:text-slate-400"
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
                      <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">Confirm password <span className="text-blue-700">*</span></label>
                      <div className="relative">
                        <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className="auth-input px-3.5 py-3 pl-11 pr-11 placeholder:text-slate-400"
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
                    <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
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
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#123c83] px-5 py-3 text-base font-semibold text-white shadow-lg shadow-blue-950/10 transition-all hover:-translate-y-0.5 hover:bg-[#0e3270] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
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
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-[0_12px_35px_rgb(15_23_42_/_0.06)] backdrop-blur-sm">
              <div className="relative">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
                  <span className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-blue-800">SARA 2026</span>
                </div>

                <h2 className="mb-3 text-2xl font-semibold tracking-[-0.03em] text-[#10213f]">Join the research community</h2>

                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Register once to submit your work, follow review decisions, and receive official conference updates.
                </p>

                {/* Benefits Cards */}
                <div className="space-y-4">
                  {[
                    { icon: CheckCircleIcon, title: 'One profile', desc: 'Use it for registration and submissions' },
                    { icon: DocumentIcon, title: 'Paper workspace', desc: 'Track your submission from one place' },
                    { icon: TrendingUpIcon, title: 'Timely updates', desc: 'Receive important conference notices' },
                  ].map((benefit, idx) => {
                    const BenefitIcon = benefit.icon
                    return (
                      <div key={idx} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
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
                    { number: '03–04 Apr', label: 'Conference dates' },
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
