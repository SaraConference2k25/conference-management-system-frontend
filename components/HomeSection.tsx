import Link from 'next/link'
import { CalendarIcon, MapPinIcon, AwardIcon, DocumentIcon } from './Icons'

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
      <section className="relative bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-blue-700 uppercase tracking-wider mb-4">SARA 2026 National Conference</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 mb-5 tracking-tight leading-tight">
              A platform for research excellence in engineering and applied sciences
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-10">
              Join leading researchers, academicians, and industry professionals to share groundbreaking research
              and innovative ideas across engineering, technology, and applied sciences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium leading-5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 px-6 py-3 text-base">
                Register Now
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-transparent px-5 py-2.5 text-sm font-medium text-blue-800 transition-colors hover:border-blue-200 hover:bg-blue-50 px-6 py-3 text-base">
                Sign In
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 pt-14 border-t border-slate-100">
            {[
              { value: '2', label: 'Conference Days', sub: 'April 3 & 4, 2026' },
              { value: '500+', label: 'Expected Participants', sub: 'From academia & industry' },
              { value: '2', label: 'Research Tracks', sub: 'Multiple specializations' },
            ].map((stat, idx) => (
              <div key={idx} className="py-4 text-center">
                <div className="text-3xl font-semibold text-slate-900 tabular-nums mb-1">{stat.value}</div>
                <p className="text-sm font-medium text-slate-700">{stat.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-semibold tracking-tight text-slate-900 text-2xl sm:text-3xl mb-8">About the Conference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
              <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <AwardIcon className="w-5 h-5 text-blue-700" /> Our Mission
              </h4>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                SARA conference brings together leading researchers, academicians, and industry professionals to share
                groundbreaking research and innovative ideas. We provide a platform for intellectual exchange and
                collaboration across various disciplines of engineering, technology, and applied sciences.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
              <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <AwardIcon className="w-5 h-5 text-blue-700" /> Why Attend
              </h4>
              <ul className="text-sm sm:text-base text-slate-600 space-y-2.5">
                {[
                  'Network with industry leaders and researchers',
                  'Present your research to a focused audience',
                  'Discover the latest trends and innovations',
                  'Collaborate on future research initiatives',
                  'Publish in conference proceedings',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-semibold tracking-tight text-slate-900 text-2xl sm:text-3xl mb-8">Important Dates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {importantDates.map((item, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wide flex items-center gap-2">
                  <CalendarIcon /> {item.event}
                </p>
                <p className="text-lg font-semibold text-slate-900 mt-2">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Tracks */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-semibold tracking-tight text-slate-900 text-2xl sm:text-3xl mb-8">Research Tracks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((track, index) => (
              <div key={index} className="rounded-xl  border-slate-200 bg-white shadow-sm p-6 sm:p-8">
                <h4 className="text-xl font-semibold text-slate-900 mb-2">{track.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{track.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-semibold tracking-tight text-slate-900 text-2xl sm:text-3xl mb-8">Conference Venue</h3>
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-blue-700" /> Saranathan College of Engineering
                </h4>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>
                    <span className="font-medium text-slate-900">Location:</span><br />
                    Panjappur, Trichy - 620012, Tamil Nadu, India
                  </p>
                  <p>
                    <span className="font-medium text-slate-900">Contact:</span><br />
                    Phone: +91-431-2760801, 2760802<br />
                    Website: www.saranathan.ac.in
                  </p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed">
                  The conference will be held at our state-of-the-art campus facilities, providing an ideal environment
                  for academic discourse and professional networking. Our modern infrastructure includes spacious
                  auditoriums, seminar halls, and excellent accommodation options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Categories */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-semibold tracking-tight text-slate-900 text-2xl sm:text-3xl mb-8">Registration Categories</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {['Students', 'Faculty', 'Research Scholars', 'Industry Professionals'].map((title, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 text-center">
                <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
                <p className="text-xs text-slate-500">Early bird discounts available</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 border  rounded-lg">
            <p className="text-sm text-slate-700">
              <span className="font-medium text-slate-900">Important:</span> At least one author of each accepted paper must register for the conference.
              Group registrations from the same institution receive special rates.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[linear-gradient(135deg,#0f172a_0%,#1e3a5f_50%,#1e40af_100%)]">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">Ready to Get Started?</h3>
          <p className="text-blue-100/90 mb-8">
            Join us for an extraordinary conference experience. Register now or sign in to your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register" className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 rounded-md font-medium hover:bg-slate-50 transition-colors text-sm">
              Create Account
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white rounded-md font-medium hover:bg-white/10 transition-colors text-sm">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
