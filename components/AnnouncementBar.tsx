import { SparklesIcon } from './Icons';

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-amber-900 dark:text-amber-100 font-medium">
          <SparklesIcon className="w-5 h-5" />
          <p className="text-center">Registration for the Conference will start from January 20, 2026</p>
        </div>
      </div>
    </div>
  )
}
