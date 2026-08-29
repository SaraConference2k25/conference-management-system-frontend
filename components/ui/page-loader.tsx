import { Spinner } from './spinner'

interface PageLoaderProps {
  label?: string
  fullScreen?: boolean
}

export function PageLoader({ label = 'Loading...', fullScreen = true }: PageLoaderProps) {
  return (
    <div
      className={
        fullScreen
          ? 'site-shell min-h-screen flex items-center justify-center p-6'
          : 'flex items-center justify-center py-16'
      }
    >
      <div className="surface-card w-full max-w-sm rounded-2xl p-7 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-800">
          <Spinner size="md" />
        </div>
        <p className="text-sm font-semibold text-slate-900">Preparing your workspace</p>
        <p className="mt-1 text-sm text-slate-500">{label}</p>
      </div>
    </div>
  )
}
