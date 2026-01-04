'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/lib/toast-context'
import { EnvelopeIcon, EyeIcon, EyeOffIcon, UserIcon, CogIcon, TrendingUpIcon, LockClosedIcon, DocumentIcon } from './Icons'

export default function LoginSection() {
  const router = useRouter()
  const { login, isLoading: authLoading } = useAuth()
  const { addToast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('participant')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (!role) {
      setError('Please select a role.')
      return
    }

    setIsLoading(true)

    try {
      await login(email, password, role)
      
      // Show success toast
      addToast('Login successful!', 'success', 3000)
      
      // Redirect based on role
      const redirectPath = {
        participant: '/dashboard',
        PARTICIPANT: '/dashboard',
        evaluator: '/dashboard/evaluator',
        EVALUATOR: '/dashboard/evaluator',
        admin: '/dashboard/admin',
        ADMIN: '/dashboard/admin',
      }[role.toLowerCase()] || '/dashboard'

      // Small delay to let user see the toast
      setTimeout(() => {
        router.push(redirectPath)
      }, 500)
    } catch (err: any) {
      console.error('Login error:', err)
      const errorMessage = err?.data?.message || err?.message || 'Login failed. Please try again.'
      setError(errorMessage)
      addToast(errorMessage, 'error', 4000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Side - Login Form */}
          <div className="w-full">
            <div className="relative">
              {/* Back Button */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 sm:mb-8 text-xs sm:text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>

              {/* Form Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-6 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">Welcome Back</h1>
                  <p className="text-blue-100 text-sm sm:text-base lg:text-lg">Sign in to access SARA 2025 Conference Portal</p>
                </div>

                {/* Form Content */}
                <div className="px-6 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10">
                  {/* Error Message */}
                  {error && (
                    <div className="mb-5 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-800 dark:text-red-200 text-xs sm:text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                        Email Address
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        Use your registered email address
                      </p>
                    </div>

                    {/* Role Selection */}
                    <div>
                      <label htmlFor="role" className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-3 tracking-wide">
                        Select Role
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                        {[
                          { value: 'participant', label: 'Participant', icon: UserIcon },
                          { value: 'evaluator', label: 'Evaluator', icon: CogIcon },
                          { value: 'admin', label: 'Administrator', icon: CogIcon },
                        ].map((roleOption) => {
                          const IconComponent = roleOption.icon
                          return (
                            <button
                              key={roleOption.value}
                              type="button"
                              onClick={() => setRole(roleOption.value)}
                              className={`py-3 px-4 rounded-lg font-semibold transition-all border-2 text-sm flex flex-col items-center gap-2 ${
                                role === roleOption.value
                                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-md'
                                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500'
                              }`}
                            >
                              <IconComponent className="w-6 h-6" />
                              <span>{roleOption.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-4 pr-12 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" />
                              <path d="M15.171 13.576l1.414 1.414a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 1.414l2.781 2.781A10.009 10.009 0 0010 3c4.478 0 8.268 2.943 9.542 7a9.972 9.972 0 01-5.071 3.576zM9 13a4 4 0 104-4v1a3 3 0 00-3 3v3z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400">
                        Enter your secure password
                      </p>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 cursor-pointer accent-blue-600"
                      />
                      <label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer font-medium">
                        Remember me
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || authLoading}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-md tracking-wide"
                    >
                      {isLoading || authLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Signing In...
                        </span>
                      ) : (
                        'Sign In to Portal'
                      )}
                    </button>

                    {/* Footer Links */}
                    <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        New to our portal?{' '}
                        <Link
                          href="/register"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-colors"
                        >
                          Create Account
                        </Link>
                      </p>
                      <Link
                        href="/"
                        className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      >
                        Forgot password?
                      </Link>
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300 tracking-wide">SARA 2025</span>
                </div>

                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                  Saranathan College of Engineering
                </h2>

                <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-semibold italic">
                  "Excellence in Engineering Education & Innovation"
                </p>

                {/* Feature Cards */}
                <div className="space-y-4">
                  {[
                    { icon: DocumentIcon, title: 'Easy Registration', desc: 'Quick and seamless registration process' },
                    { icon: TrendingUpIcon, title: 'Real-time Analytics', desc: 'Track your submissions and evaluations' },
                    { icon: LockClosedIcon, title: 'Secure Platform', desc: 'Enterprise-grade security for your data' },
                  ].map((feature, idx) => {
                    const FeatureIcon = feature.icon
                    return (
                      <div key={idx} className="flex gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 hover:shadow-md transition-shadow">
                        <FeatureIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">{feature.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">{feature.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  {[
                    { number: '500+', label: 'Participants' },
                    { number: '100+', label: 'Papers' },
                    { number: '4/3-4', label: 'Dates' },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{stat.number}</div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">{stat.label}</p>
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
