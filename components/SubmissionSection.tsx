import Link from 'next/link'
import { DocumentIcon, CheckCircleIcon, CalendarIcon } from './Icons'

const steps = [
  { title: 'Prepare Your Paper', desc: 'Format your paper according to the conference template (IEEE format). Ensure it meets all technical and formatting requirements.' },
  { title: 'Login to Portal', desc: 'Access the submission system through your registered account on our conference portal.' },
  { title: 'Upload Documents', desc: 'Submit your paper in PDF format along with any supplementary materials, source code, or datasets.' },
  { title: 'Complete Metadata', desc: 'Fill in all required fields including title, abstract, keywords, and author information with affiliations.' },
  { title: 'Review and Submit', desc: 'Carefully review all information before final submission. You cannot edit after submission.' },
]

const timeline = [
  { date: 'Jan 20, 2026', title: 'Submission Portal Opens', desc: 'You can start uploading your papers' },
  { date: 'Feb 20, 2026', title: 'Submission Deadline', desc: 'Final date to submit papers' },
  { date: 'Mar 1, 2026', title: 'Review Period Ends', desc: 'Peer review process completes' },
  { date: 'Mar 10, 2026', title: 'Acceptance Notification', desc: 'Authors notified of acceptance/rejection' },
  { date: 'Mar 30, 2026', title: 'Camera-Ready Submission', desc: 'Final version due with revisions' },
]

export default function SubmissionSection() {
  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-slate-900 mb-8 tracking-tight">Paper Submission Guidelines</h2>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">How to Submit Your Research Paper</h3>
          <ol className="space-y-5">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center font-semibold text-xs">{idx + 1}</span>
                <div>
                  <strong className="text-slate-900 font-semibold text-sm">{step.title}:</strong>
                  <p className="text-slate-600 mt-1 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Submission Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
            <h4 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
              <DocumentIcon className="w-5 h-5 text-blue-700" /> Paper Requirements
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                ['Full Papers:', 'Maximum 6 pages'],
                ['Short Papers:', 'Maximum 4 pages'],
                ['Format:', 'IEEE template (.doc or .pdf)'],
                ['Language:', 'English only'],
                ['File Size:', 'Maximum 10 MB'],
              ].map(([label, value]) => (
                <li key={label} className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 font-medium">{label}</strong> {value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
            <h4 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-blue-700" /> Important Rules
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                ['Originality:', 'Papers must be original and not published elsewhere'],
                ['Review Process:', 'Double-blind peer review'],
                ['Plagiarism:', 'Plagiarism check mandatory'],
                ['Author Information:', 'Blind submission required'],
                ['Deadline:', 'February 20, 2026 (11:59 PM IST)'],
              ].map(([label, value]) => (
                <li key={label} className="flex items-start gap-2.5">
                  <span className="text-blue-700 font-semibold mt-0.5">•</span>
                  <span><strong className="text-slate-900 font-medium">{label}</strong> {value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 mb-8">
          <h4 className="text-base font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-700" /> Submission Timeline
          </h4>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.date} className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-medium text-blue-700">{item.date}</div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium leading-5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 inline-flex">
            Submit Your Paper
          </Link>
        </div>
      </div>
    </div>
  )
}
