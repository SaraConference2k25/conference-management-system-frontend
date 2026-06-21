import { ReactNode } from 'react'

type Accent = 'blue' | 'green' | 'amber' | 'red' | 'slate' | 'purple'

const accentMap: Record<Accent, string> = {
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
  slate: 'bg-slate-100 text-slate-700',
  purple: 'bg-violet-50 text-violet-700',
}

interface StatCardProps {
  label: string
  value: ReactNode
  icon?: ReactNode
  accent?: Accent
}

export default function StatCard({ label, value, icon, accent = 'blue' }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-slate-500 text-xs font-medium mb-1">{label}</p>
          <p className="text-2xl font-semibold text-slate-900 tabular-nums">{value}</p>
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${accentMap[accent]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
