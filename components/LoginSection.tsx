'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/lib/toast-context'
import { EnvelopeIcon, UserIcon, CogIcon, TrendingUpIcon, LockClosedIcon, DocumentIcon } from './Icons'

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Login Form */}
          <div className="w-full">
            <div className="relative">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>

              {/* Form Card */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-[linear-gradient(135deg,#0f172a_0%,#1e3a5f_50%,#1e40af_100%)] px-6 sm:px-8 py-8">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-1">Welcome back</h1>
                  <p className="text-blue-200/80 text-sm">Sign in to the SARA 2026 Conference Portal</p>
                </div>

                <div className="px-6 sm:px-8 py-8">
                  {/* Error Message */}
                  {error && (
                    <div className="mb-5 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-800 text-xs sm:text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Email Address</label>
                      <div className="relative">
                        <EnvelopeIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 pl-11"
                          required
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Use your registered email address
                      </p>
                    </div>

                    {/* Role Selection */}
                    <div>
                      <label htmlFor="role" className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Select Role</label>
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
                              className={`py-3 px-4 rounded-lg font-medium transition-colors border text-sm flex flex-col items-center gap-2 ${
                                role === roleOption.value
                                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                                  : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                              }`}
                            >
                              <IconComponent className="w-5 h-5" />
                              <span>{roleOption.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="mb-1.5 block text-[0.8125rem] font-medium text-slate-600">Password</label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-[3px] focus:ring-blue-600/15 disabled:cursor-not-allowed disabled:bg-slate-100 pr-11"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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
                      <p className="mt-1.5 text-xs text-slate-500">
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
                        className="w-4 h-4 rounded border-slate-300 bg-white cursor-pointer accent-blue-700"
                      />
                      <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer font-medium">
                        Remember me
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
                          Signing in...
                        </span>
                      ) : (
                        'Sign in to portal'
                      )}
                    </button>

                    {/* Footer Links */}
                    <div className="text-center pt-4 border-t border-slate-100">
                      <p className="text-sm text-slate-500 mb-3">
                        New to our portal?{' '}
                        <Link
                          href="/register"
                          className="text-blue-700 hover:text-blue-800 font-medium transition-colors"
                        >
                          Create Account
                        </Link>
                      </p>
                      <Link
                        href="/"
                        className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
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
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-8">
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-md mb-6">
                  <span className="text-xs font-medium text-blue-800 tracking-wide">SARA 2026</span>
                </div>

                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  Saranathan College of Engineering
                </h2>

                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Excellence in engineering education and innovation. Access your conference portal to manage submissions, track reviews, and stay updated.
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
                      <div key={idx} className="flex gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                        <FeatureIcon className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-slate-900 text-sm">{feature.title}</h4>
                          <p className="text-slate-500 text-xs mt-0.5">{feature.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Stats */}
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
