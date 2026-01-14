import { CalendarIcon, MapPinIcon, SparklesIcon } from './Icons'
import Image from 'next/image' 

export default function Header() {
  return (
    <header className="w-full">
      {/* Top Bar - College Info */}
      <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left Logos Section */}
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <div className="w-24 h-24 rounded-full flex items-center justify-center p-0">
              <div className="rounded-full overflow-hidden w-20 h-20">
                <Image src="/saranathan_logo.jpg" alt="Saranathan logo" width={80} height={80} className="object-contain" />
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-gray-300 dark:bg-gray-700"></div>
            <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium text-center sm:text-left">
              <div className="font-bold text-gray-900 dark:text-white tracking-wide text-base sm:text-lg">SARANATHAN</div>
              <div className="tracking-wide text-sm sm:text-base text-gray-800 dark:text-gray-200 font-medium">COLLEGE OF ENGINEERING</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-medium mt-1">An autonomous institution</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Affiliated to Anna University</div>
            </div>
          </div>

          {/* Center - Tagline */}
          <div className="hidden md:block text-center flex-grow">
            <p className="text-lg sm:text-xl md:text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide uppercase">WINNERS BEGIN WITH SARANATHAN</p>
          </div>

          {/* Right - Counselling Code */}
          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-gray-800 text-gray-900 px-4 py-3 rounded-lg shadow-md font-semibold text-center border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium tracking-wide text-gray-600 dark:text-gray-400">Counselling Code</div>
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">3819</div>
            </div>
            <div className="hidden sm:flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 relative">
              <Image src="/silver_jubliee.jpeg" alt="Silver Jubilee" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-800 dark:via-indigo-800 dark:to-blue-900 py-10 sm:py-16 px-4 sm:px-8 relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1200" height="300" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left - Empty for balance */}
            <div className="hidden md:block"></div>

            {/* Center - Main Title */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg tracking-tight">
                SARA 2026
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-4 drop-shadow-lg tracking-wide">
                National Conference
              </h2>
              <p className="text-base sm:text-lg text-blue-100 font-semibold drop-shadow-md">
                Advancing Research and Academic Excellence
              </p>
            </div>

            {/* Right - Info Card */}
            <div className="flex justify-center md:justify-end">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-xs w-full border border-gray-100 dark:border-gray-700">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-4 tracking-widest uppercase">Conference Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
                      <CalendarIcon /> Dates
                    </span>
                    <p className="text-gray-900 dark:text-white font-semibold mt-1">April 3 & 4, 2026</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
                      <MapPinIcon /> Venue
                    </span>
                    <p className="text-gray-900 dark:text-white font-semibold mt-1">Saranathan College, Trichy</p>
                  </div>
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
                      <SparklesIcon /> Status
                    </span>
                    <p className="text-green-600 dark:text-green-400 font-semibold mt-1">Registrations Opening Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-50" style={{
          clipPath: 'polygon(0 50%, 100% 0%, 100% 100%, 0% 100%)'
        }}></div>
      </div>

      {/* Info Bar */}
      <div className="w-full bg-gray-50 dark:bg-gray-800 py-3 px-4 sm:px-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center gap-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium tracking-wide">
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Double-blind peer review
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            ISBN proceedings
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Industry & Academia collaboration
          </span>
        </div>
      </div>
    </header>
  )
}
