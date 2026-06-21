'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ExitIcon, MenuIcon, XIcon } from '@/components/Icons'
import { getInitials, getDisplayName } from '@/lib/utils/avatar'

export interface DashboardNavItem {
  label: string
  href: string
  icon?: ReactNode
}

interface DashboardShellProps {
  roleLabel: string
  navItems: DashboardNavItem[]
  user?: { fullName?: string; email?: string } | null
  onLogout: () => void
  children: ReactNode
}

export default function DashboardShell({
  roleLabel,
  navItems,
  user,
  onLogout,
  children,
}: DashboardShellProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[linear-gradient(135deg,#0f172a_0%,#1e3a5f_50%,#1e40af_100%)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-5 h-5 text-white" />
                ) : (
                  <MenuIcon className="w-5 h-5 text-white" />
                )}
              </button>
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-sm font-bold tracking-tight text-white">S</span>
              <div className="flex flex-col">
                <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-tight">
                  SARA 2026
                </h1>
                <p className="text-xs text-blue-200/80">{roleLabel} Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-white/90 line-clamp-1 max-w-[180px]">
                  {getDisplayName(user?.fullName, user?.email)}
                </span>
                <span className="text-xs text-blue-200/70">{roleLabel}</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center ring-1 ring-white/20">
                <span className="text-white font-medium text-xs">
                  {getInitials(user?.fullName || '', user?.email || '')}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md font-medium transition-colors text-xs sm:text-sm"
              >
                <ExitIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${isActive(item.href) ? 'bg-blue-50 text-blue-800' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-60 bg-white border-r border-slate-200 min-h-[calc(100vh-3.75rem)]">
          <nav className="sticky top-[3.75rem] p-4 space-y-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${isActive(item.href) ? 'bg-blue-50 text-blue-800' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  )
}
