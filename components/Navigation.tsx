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
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop Login Button */}
          <div className="hidden md:flex gap-3">
            <Link
              href="/login"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800">
            <ul className="flex flex-col gap-2 mt-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavClick(item.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Link
                href="/login"
                className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex-1 px-4 py-2 border-2 border-blue-600 text-blue-600 text-center rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
