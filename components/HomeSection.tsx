import Link from 'next/link'
import { CalendarIcon, MapPinIcon, LightBulbIcon, UsersIcon, AwardIcon, DocumentIcon } from './Icons'

export default function HomeSection() {
  const importantDates = [
    { event: 'Registration Opens', date: 'January 20, 2026' },
    { event: 'Paper Submission Deadline', date: 'February 20, 2026' },
    { event: 'Acceptance Notification', date: 'March 1, 2026' },
    { event: 'Camera-Ready Submission', date: 'March 30, 2026' },
    { event: 'Conference Dates', date: 'April 3 & 4, 2026' },
  ]

  const tracks = [
    {
      title: 'Computing',
      description: 'Machine Learning, Deep Learning, Computer Vision, Natural Language Processing',
    },
    {
      title: 'Electronics & Communications',
      description: 'IoT, Wireless Networks, Signal Processing, VLSI Design',
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              SARA 2025 National Conference
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
              Join leading researchers, academicians, and industry professionals to share groundbreaking research
              and innovative ideas across engineering, technology, and applied sciences.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center border-t-4 border-blue-600">
              <div className="text-4xl font-black text-blue-600 mb-2">2</div>
              <p className="text-gray-600 dark:text-gray-300 font-semibold">Conference Days</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">April 3 & 4, 2026</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center border-t-4 border-indigo-600">
              <div className="text-4xl font-black text-indigo-600 mb-2">500+</div>
              <p className="text-gray-600 dark:text-gray-300 font-semibold">Expected Participants</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">From academia & industry</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center border-t-4 border-purple-600">
              <div className="text-4xl font-black text-purple-600 mb-2">2</div>
              <p className="text-gray-600 dark:text-gray-300 font-semibold">Research Tracks</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Multiple specializations</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-center"
            >
              Register Now
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors text-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">About the Conference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-8 border-l-4 border-blue-600">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                <LightBulbIcon /> Our Mission
              </h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                SARA 2025 brings together leading researchers, academicians, and industry professionals to share
                groundbreaking research and innovative ideas. We provide a platform for intellectual exchange and
                collaboration across various disciplines of engineering, technology, and applied sciences.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-gray-800 rounded-xl p-8 border-l-4 border-indigo-600">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                <AwardIcon /> Why Attend
              </h4>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-0.5">•</span>
                  Network with industry leaders and researchers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-0.5">•</span>
                  Present your research to a focused audience
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-0.5">•</span>
                  Discover the latest trends and innovations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-0.5">•</span>
                  Collaborate on future research initiatives
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-0.5">•</span>
                  Publish in conference proceedings
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center tracking-tight">Important Dates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {importantDates.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600"
              >
                <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold flex items-center gap-2">
                  <CalendarIcon /> {item.event}
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-2">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Tracks Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center tracking-tight">Research Tracks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((track, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <h4 className="text-2xl font-bold mb-3 tracking-tight">{track.title}</h4>
                <p className="text-blue-100 leading-relaxed">{track.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Conference Venue</h3>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MapPinIcon /> Saranathan College of Engineering
                </h4>
                <div className="space-y-3 text-gray-700 dark:text-gray-300 font-medium">
                  <p>
                    <strong className="text-gray-900 dark:text-white">Location:</strong><br />
                    Panjappur, Trichy - 620012<br />
                    Tamil Nadu, India
                  </p>
                  <p>
                    <strong className="text-gray-900 dark:text-white">Contact:</strong><br />
                    Phone: +91-431-2760801, 2760802<br />
                    Website: www.saranathan.ac.in
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                  The conference will be held at our state-of-the-art campus facilities, providing an ideal environment
                  for academic discourse and professional networking. Our modern infrastructure includes spacious
                  auditoriums, seminar halls, and excellent accommodation options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Info Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Registration Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Students', color: 'from-blue-500 to-blue-600' },
              { title: 'Faculty', color: 'from-indigo-500 to-indigo-600' },
              { title: 'Research Scholars', color: 'from-purple-500 to-purple-600' },
              { title: 'Industry Professionals', color: 'from-cyan-500 to-cyan-600' },
            ].map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${category.color} text-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow`}
              >
                <h4 className="font-semibold text-lg mb-2">{category.title}</h4>
                <p className="text-sm text-white/90 font-medium">Early bird discounts available</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              <strong className="text-gray-900 dark:text-white">Important:</strong> At least one author of each accepted paper must register for the conference.
              Group registrations from the same institution receive special rates.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Ready to Get Started?</h3>
          <p className="text-blue-100 text-lg mb-8 font-medium">
            Join us for an extraordinary conference experience. Register now or sign in to your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
