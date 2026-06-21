import { cn } from '@/lib/utils/cn'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
}

export function Spinner({ size = 'md', className, label }: SpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)} role="status" aria-label={label || 'Loading'}>
      <div
        className={cn(
          'animate-spin rounded-full border-slate-200 border-t-blue-600',
          sizeMap[size]
        )}
      />
      {label && (
        <p className="text-sm text-slate-500 font-medium">{label}</p>
      )}
    </div>
  )
}
