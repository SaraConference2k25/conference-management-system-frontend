'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { EnvelopeIcon, UserIcon, LockClosedIcon, EyeIcon, EyeOffIcon, CheckCircleIcon, SparklesIcon, AwardIcon } from '@/components/Icons'

export default function RegisterPage() {
  const router = useRouter()
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock registration
      localStorage.setItem('newUser', JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
      }))

      setSuccess('Account created successfully! Redirecting to login...')
      
      setTimeout(() => {
        router.push('/login?registered=true')
      }, 2000)
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Register Form */}
          <div className="w-full">
            <div className="relative">
              {/* Back Button */}
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 text-sm font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Login
              </Link>

              {/* Form Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 px-8 sm:px-10 py-8 sm:py-10">
                  <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">Create Account</h1>
                  <p className="text-green-100 text-lg">Join SARA 2025 Conference Community</p>
                </div>

                {/* Form Content */}
                <div className="px-8 sm:px-10 py-8 sm:py-10">
                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-800 dark:text-red-200 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-green-800 dark:text-green-200 text-sm font-medium">{success}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name Field */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                        Full Name *
                      </label>
                      <div className="relative">
                        <UserIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                        Email Address *
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                          required
                        />
                      </div>
                    </div>

                    {/* Affiliation Field */}
                    <div>
                      <label htmlFor="affiliation" className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                        Institution / Organization
                      </label>
                      <input
                        id="affiliation"
                        name="affiliation"
                        type="text"
                        value={formData.affiliation}
                        onChange={handleChange}
                        placeholder="Your Institution"
                        className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                        Password *
                      </label>
                      <div className="relative">
                        <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Min. 6 characters"
                          className="w-full pl-12 pr-12 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className="w-full pl-12 pr-12 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? (
                            <EyeOffIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800/50">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="w-5 h-5 rounded accent-green-600 cursor-pointer mt-0.5 flex-shrink-0"
                        required
                      />
                      <label htmlFor="agreeTerms" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                        I agree to the{' '}
                        <Link href="/terms" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-bold">
                          Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-bold">
                          Privacy Policy
                        </Link>{' '}
                        *
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-md tracking-wide"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Creating Account...
                        </span>
                      ) : (
                        'Create My Account'
                      )}
                    </button>

                    {/* Login Link */}
                    <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already part of our community?{' '}
                        <Link
                          href="/login"
                          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-bold transition-colors"
                        >
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="relative">
                {/* College Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                  <SparklesIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-bold text-green-700 dark:text-green-300 tracking-wide">SARA 2025</span>
                </div>

                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                  Join Our Community
                </h2>

                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 font-semibold">
                  Become part of the academic excellence journey at Saranathan College of Engineering
                </p>

                {/* Benefits Cards */}
                <div className="space-y-4">
                  {[
                    { icon: CheckCircleIcon, title: 'Easy Setup', desc: 'Complete registration in seconds' },
                    { icon: AwardIcon, title: 'Exclusive Access', desc: 'Access papers, presentations & more' },
                    { icon: SparklesIcon, title: 'Community', desc: 'Connect with researchers worldwide' },
                  ].map((benefit, idx) => {
                    const BenefitIcon = benefit.icon
                    return (
                      <div key={idx} className="flex gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 hover:shadow-md transition-shadow">
                        <BenefitIcon className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">{benefit.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">{benefit.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Conference Info */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  {[
                    { number: '500+', label: 'Participants' },
                    { number: '100+', label: 'Papers' },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-black text-green-600 dark:text-green-400">{stat.number}</div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tagline */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 italic">
                  "Excellence • Innovation • Future Leaders"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
