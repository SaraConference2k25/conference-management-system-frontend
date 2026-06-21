'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavigationProps {
  activeSection: string
  onNavClick: (section: string) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export default function Navigation({
  activeSection,
  onNavClick,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'registration', label: 'Registration' },
    { id: 'submission', label: 'Submission' },
    { id: 'publication', label: 'Publication' },
    { id: 'contacts', label: 'Contacts' },
  ]

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-14">
          <ul className="hidden md:flex gap-0.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex gap-2">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-transparent px-5 py-2.5 text-sm font-medium text-blue-800 transition-colors hover:border-blue-200 hover:bg-blue-50 text-sm py-2">
              Login
            </Link>
            <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium leading-5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 text-sm py-2">
              Register
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 my-1 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-100">
            <ul className="flex flex-col gap-0.5 mt-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavClick(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
              <Link href="/login" className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-transparent px-5 py-2.5 text-sm font-medium text-blue-800 transition-colors hover:border-blue-200 hover:bg-blue-50 text-center text-sm py-2.5">
                Login
              </Link>
              <Link href="/register" className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium leading-5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 text-center text-sm py-2.5">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
