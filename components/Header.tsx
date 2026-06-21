import { CalendarIcon, MapPinIcon, SparklesIcon } from './Icons'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200">
      {/* Top Bar - College Info */}
      <div className="w-full py-3 px-4 sm:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-slate-100 shrink-0">
              <Image src="/saranathan_logo.jpg" alt="Saranathan logo" width={64} height={64} className="object-contain w-full h-full" />
            </div>
            <div className="hidden sm:block h-10 w-px bg-slate-200" />
            <div className="text-center sm:text-left">
              <div className="font-semibold text-slate-900 tracking-tight text-base">Saranathan College of Engineering</div>
              <div className="text-xs text-slate-500 mt-0.5">Autonomous Institution · Affiliated to Anna University</div>
            </div>
          </div>

          <div className="hidden md:block text-center">
            <p className="text-md font-medium text-blue-800 tracking-wide uppercase">Winners Begin With Saranathan</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm px-4 py-2 text-center">
              <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Counselling Code</div>
              <div className="text-xl font-semibold text-slate-900 tabular-nums">3819</div>
            </div>
            <div className="hidden sm:block w-14 h-14 rounded-full overflow-hidden ring-2 ring-slate-100 relative shrink-0">
              <Image src="/silver_jubliee.jpeg" alt="Silver Jubilee" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="w-full bg-[linear-gradient(135deg,#0f172a_0%,#1e3a5f_50%,#1e40af_100%)] py-12 sm:py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="300" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="hidden md:block" />

            <div className="text-center">
              <p className="text-blue-200 text-xs font-medium uppercase tracking-[0.2em] mb-3">National Conference</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-3 tracking-tight">
                SARA 2026
              </h1>
              <p className="text-base sm:text-lg text-blue-100/90 font-normal max-w-md mx-auto">
                Advancing Research and Academic Excellence
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 max-w-xs w-full">
                <h3 className="text-[10px] font-semibold text-slate-400 mb-4 tracking-widest uppercase">Conference Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-500 font-medium flex items-center gap-2 text-xs">
                      <CalendarIcon /> Dates
                    </span>
                    <p className="text-slate-900 font-medium mt-0.5">April 3 & 4, 2026</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium flex items-center gap-2 text-xs">
                      <MapPinIcon /> Venue
                    </span>
                    <p className="text-slate-900 font-medium mt-0.5">Saranathan College, Trichy</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-slate-500 font-medium flex items-center gap-2 text-xs">
                      <SparklesIcon /> Status
                    </span>
                    <p className="text-emerald-600 font-medium mt-0.5 text-sm">Registrations Opening Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="w-full bg-slate-50 py-2.5 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center gap-x-6 gap-y-1 text-xs text-slate-600">
          <span className="flex items-center gap-2 justify-center">
            <span className="w-1 h-1 bg-blue-600 rounded-full" />
            Double-blind peer review
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="flex items-center gap-2 justify-center">
            <span className="w-1 h-1 bg-blue-600 rounded-full" />
            ISBN proceedings
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="flex items-center gap-2 justify-center">
            <span className="w-1 h-1 bg-blue-600 rounded-full" />
            Industry & Academia collaboration
          </span>
        </div>
      </div>
    </header>
  )
}
