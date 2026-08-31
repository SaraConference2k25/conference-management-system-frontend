import Link from 'next/link'
import { CalendarIcon, MapPinIcon, AwardIcon } from './Icons'

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
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
        <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-4xl mx-auto text-center">
            <p className="section-kicker mb-5">SARA 2026 · National Conference</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#10213f] mb-6 tracking-[-0.045em] leading-[1.05]">
              A platform for research excellence in engineering and applied sciences
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed mb-10">
              Join leading researchers, academicians, and industry professionals to share groundbreaking research
              and innovative ideas across engineering, technology, and applied sciences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register" className="inline-flex items-center justify-center rounded-lg bg-[#123c83] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-900/15 transition-all hover:-translate-y-0.5 hover:bg-[#0e3270] hover:shadow-xl hover:shadow-blue-900/20">
                Register Now
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900">
                Sign In
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="relative mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm sm:grid-cols-3">
            {[
              { value: '2', label: 'Conference Days', sub: 'April 3 & 4, 2026' },
              { value: '500+', label: 'Expected Participants', sub: 'From academia & industry' },
              { value: '2', label: 'Research Tracks', sub: 'Multiple specializations' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white px-6 py-6 text-center">
                <div className="text-3xl font-semibold text-[#10213f] tabular-nums mb-1">{stat.value}</div>
                <p className="text-sm font-medium text-slate-700">{stat.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <p className="section-kicker mb-3">The SARA experience</p>
          <h3 className="section-title mb-9">About the Conference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="surface-card rounded-2xl p-6 sm:p-8">
              <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <AwardIcon className="w-5 h-5 text-blue-700" /> Our Mission
              </h4>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                SARA conference brings together leading researchers, academicians, and industry professionals to share
                groundbreaking research and innovative ideas. We provide a platform for intellectual exchange and
                collaboration across various disciplines of engineering, technology, and applied sciences.
              </p>
            </div>
            <div className="surface-card rounded-2xl p-6 sm:p-8">
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
      <section className="py-20 sm:py-24 px-4 sm:px-8 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div><p className="section-kicker mb-3">Plan ahead</p><h3 className="section-title">Important Dates</h3></div>
            <p className="text-sm text-slate-500">All deadlines are based on Indian Standard Time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {importantDates.map((item, index) => (
              <div key={index} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5">
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
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <p className="section-kicker mb-3">Share your work</p>
          <h3 className="section-title mb-9">Research Tracks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((track, index) => (
              <div key={index} className="surface-card rounded-2xl border-l-4 border-l-blue-700 p-6 sm:p-8">
                <h4 className="text-xl font-semibold text-slate-900 mb-2">{track.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{track.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="section-kicker mb-3">Meet in Trichy</p>
          <h3 className="section-title mb-9">Conference Venue</h3>
          <div className="surface-card rounded-2xl p-6 sm:p-8">
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
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <p className="section-kicker mb-3">Join the community</p>
          <h3 className="section-title mb-9">Registration Categories</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {['Students', 'Faculty', 'Research Scholars', 'Industry Professionals'].map((title, index) => (
              <div key={index} className="surface-card rounded-2xl p-5 text-center">
                <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
                <p className="text-xs text-slate-500">Early bird discounts available</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
            <p className="text-sm text-slate-700">
              <span className="font-medium text-slate-900">Important:</span> At least one author of each accepted paper must register for the conference.
              Group registrations from the same institution receive special rates.
            </p>
          </div>
        </div>
      </section>

      {/* Our Projects */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h3 className="font-semibold tracking-tight text-slate-900 text-2xl sm:text-3xl mb-2">Our Projects</h3>
            <p className="text-slate-500 text-sm">Built by our team to solve real-world problems</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'SaraSell',
                tagline: 'Online Campus Marketplace',
                description: 'A community-driven platform revolutionizing how students access educational materials. Solving a real campus problem with affordable, sustainable solutions.',
                stats: [
                  { value: '470+', label: 'Users' },
                  { value: '6,000+', label: 'Net Sales' },
                  { value: '170+', label: 'Products' },
                ],
                url: 'https://sarasell.netlify.app',
                github: 'https://github.com/Minus-one-enterprise/sarasell',
                accent: 'emerald',
              },
              {
                name: 'ExplainIt',
                tagline: 'AI-Powered Jargon Simplifier',
                description: 'An open-source AI-powered web application that transforms dense technical jargon and academic terminology into clear, beginner-friendly explanations.',
                stats: [
                  { value: 'React', label: 'Frontend' },
                  { value: 'Gemini AI', label: 'Engine' },
                  { value: 'Open Source', label: 'License' },
                ],
                url: 'https://explainit.netlify.app',
                github: 'https://github.com/Minus-one-enterprise/explain-it',
                accent: 'violet',
              },
              {
                name: 'SaraConference',
                tagline: 'Conference Management Platform',
                description: 'A comprehensive, enterprise-grade conference management platform for academic paper submissions, reviews, and conference logistics.',
                stats: [
                  { value: 'JWT Auth', label: 'Security' },
                  { value: 'Role-Based', label: 'Dashboards' },
                  { value: 'Real-time', label: 'Analytics' },
                ],
                url: 'https://saraconference2026.netlify.app',
                github: 'https://github.com/SaraConference2k25/conference-management-system-frontend',
                accent: 'blue',
              },
            ].map((project, index) => {
              const accentClasses = {
                emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', dot: 'bg-emerald-500' },
                violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100', dot: 'bg-violet-500' },
                blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', dot: 'bg-blue-500' },
              }[project.accent] || { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', dot: 'bg-blue-500' }

              return (
                <div key={index} className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-2.5 h-2.5 rounded-full ${accentClasses.dot}`} />
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{project.name}</h4>
                      <p className={`text-xs font-medium ${accentClasses.text}`}>{project.tagline}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">{project.description}</p>

                  <div className="grid grid-cols-3 gap-3 mb-5 pt-4 border-t border-slate-100">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm font-semibold text-slate-900">{stat.value}</div>
                        <p className="text-[10px] text-slate-500 mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg ${accentClasses.bg} ${accentClasses.text} border ${accentClasses.border} px-3 py-2 text-xs font-medium transition-colors hover:opacity-80`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-24 px-4 sm:px-8 bg-[linear-gradient(122deg,#081a36_0%,#123c83_58%,#1d5cbb_100%)]">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">Ready to Get Started?</h3>
          <p className="text-blue-100/90 mb-8">
            Join us for an extraordinary conference experience. Register now or sign in to your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register" className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm">
              Create Account
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
