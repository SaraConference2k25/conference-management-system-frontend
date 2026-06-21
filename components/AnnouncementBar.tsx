import { SparklesIcon } from './Icons'

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-blue-50 border-b border-blue-100 py-2.5 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-blue-800 text-sm">
          <SparklesIcon className="w-4 h-4 shrink-0" />
          <p className="text-center font-medium">
            Registration for the Conference will start from January 20, 2026
          </p>
        </div>
      </div>
    </div>
  )
}
