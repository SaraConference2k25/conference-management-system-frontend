import { BarChartIcon, PlusIcon, DocumentIcon, UsersIcon } from '@/components/Icons'
import type { DashboardNavItem } from './DashboardShell'

export const participantNav: DashboardNavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <BarChartIcon className="w-4 h-4" /> },
  { label: 'Upload Paper', href: '/dashboard/upload', icon: <PlusIcon className="w-4 h-4" /> },
  { label: 'My Papers', href: '/dashboard/my-papers', icon: <DocumentIcon className="w-4 h-4" /> },
]

export const adminNav: DashboardNavItem[] = [
  { label: 'Dashboard', href: '/dashboard/admin', icon: <BarChartIcon className="w-4 h-4" /> },
  { label: 'Manage Papers', href: '/dashboard/admin/papers', icon: <DocumentIcon className="w-4 h-4" /> },
  { label: 'Manage Evaluators', href: '/dashboard/admin/evaluators', icon: <UsersIcon className="w-4 h-4" /> },
]

export const evaluatorNav: DashboardNavItem[] = [
  { label: 'Dashboard', href: '/dashboard/evaluator', icon: <BarChartIcon className="w-4 h-4" /> },
  { label: 'Evaluate Papers', href: '/dashboard/evaluator/evaluate-papers', icon: <DocumentIcon className="w-4 h-4" /> },
]
