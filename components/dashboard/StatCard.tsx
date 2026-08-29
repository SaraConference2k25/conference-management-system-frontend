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
    <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_2px_rgb(15_23_42_/_0.03),0_8px_22px_rgb(15_23_42_/_0.035)] transition-shadow hover:shadow-[0_3px_8px_rgb(15_23_42_/_0.06),0_12px_28px_rgb(15_23_42_/_0.06)]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-semibold text-slate-500">{label}</p>
          <p className="text-2xl font-semibold tracking-[-0.03em] text-[#10213f] tabular-nums">{value}</p>
        </div>
        {icon && (
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accentMap[accent]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
