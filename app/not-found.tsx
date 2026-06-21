export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-semibold text-slate-200 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Page not found</h1>
        <p className="text-slate-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <a href="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium leading-5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          Return to Home
        </a>
      </div>
    </div>
  )
}
