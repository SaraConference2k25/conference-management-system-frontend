import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('loading-shimmer rounded-lg', className)}
      aria-hidden="true"
    />
  )
}
