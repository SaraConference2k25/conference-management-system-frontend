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
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10213f] shadow-[0_1px_0_rgb(15_23_42_/_0.2)]">
        <div className="mx-auto max-w-[90rem] px-3 py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-lg p-2 transition-colors hover:bg-white/10 md:hidden"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-5 h-5 text-white" />
                ) : (
                  <MenuIcon className="w-5 h-5 text-white" />
                )}
              </button>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold tracking-tight text-white shadow-inner shadow-blue-300/20">S</div>
              <div className="flex flex-col">
                <h1 className="text-sm font-semibold tracking-[-0.02em] text-white leading-tight sm:text-base">
                  SARA <span className="hidden font-normal text-blue-200 sm:inline">|</span> <span className="hidden sm:inline">Workspace</span>
                </h1>
                <p className="text-xs text-blue-200/75">{roleLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-white/90 line-clamp-1 max-w-[200px]">
                  {getDisplayName(user?.fullName, user?.email)}
                </span>
                <span className="text-xs text-blue-200/70">{roleLabel}</span>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                <span className="text-white font-medium text-xs">
                  {getInitials(user?.fullName || '', user?.email || '')}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/15 sm:text-sm"
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
        <div className="border-b border-slate-200 bg-white md:hidden">
          <nav className="mx-auto max-w-[90rem] space-y-1 px-3 py-3 sm:px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${isActive(item.href) ? 'bg-blue-50 text-blue-800' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                {item.icon && <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isActive(item.href) ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}>{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      <div className="mx-auto flex max-w-[90rem]">
        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-3.75rem)] w-[4.75rem] shrink-0 border-r border-slate-200/80 bg-white/80 md:block lg:w-64">
          <nav className="sticky top-[3.75rem] space-y-1 p-4">
            <p className="hidden px-3 pb-2 pt-1 text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-slate-400 lg:block">Workspace</p>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                title={item.label}
                className={`flex w-full items-center justify-center gap-2.5 rounded-xl px-2 py-2.5 text-left text-sm font-semibold transition-all lg:justify-start lg:px-3 ${isActive(item.href) ? 'bg-blue-50 text-blue-800 ring-1 ring-blue-100' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                {item.icon && <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${isActive(item.href) ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}>{item.icon}</span>}
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
