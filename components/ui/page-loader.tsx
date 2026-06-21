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
          ? 'min-h-screen flex items-center justify-center bg-slate-50'
          : 'flex items-center justify-center py-16'
      }
    >
      <Spinner size="lg" label={label} />
    </div>
  )
}
