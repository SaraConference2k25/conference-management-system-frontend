import { BookIcon, AwardIcon, ShieldCheckIcon } from './Icons'

const processSteps = [
  { title: 'Peer Review', desc: 'All submitted papers undergo rigorous double-blind peer review by experts in the field. Each paper is reviewed by at least 2-3 reviewers.' },
  { title: 'Notification', desc: 'Authors will be notified of acceptance/rejection status by March 10, 2026, along with detailed reviewer comments.' },
  { title: 'Camera-Ready Submission', desc: 'Accepted papers must be revised according to reviewer comments. Finalized versions must be submitted by March 30, 2026.' },
  { title: 'Copyright Transfer', desc: 'Complete the copyright transfer form provided for final publication and conference proceedings.' },
  { title: 'Conference Proceedings', desc: 'Accepted papers will be published in the official conference proceedings with ISBN.' },
]

export default function PublicationSection() {
  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-slate-900 mb-8 tracking-tight">Publication Information</h2>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Publication Process</h3>
          <ol className="space-y-5">
            {processSteps.map((step, idx) => (
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

        {/* Publication Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
            <h4 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
              <BookIcon className="w-5 h-5 text-blue-700" /> Publication Details
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                ['Conference Proceedings:', 'Published with ISBN'],
                ['Digital Access:', 'Online proceedings available to all participants'],
                ['Print Copies:', 'Limited print copies available for purchase'],
                ['Archive:', 'Permanent digital archive maintained'],
                ['Citation:', 'Properly indexed for academic citations'],
              ].map(([label, value]) => (
                <li key={label} className="flex items-start gap-2.5">
                  <span className="text-blue-700 font-semibold mt-0.5">•</span>
                  <span><strong className="text-slate-900 font-medium">{label}</strong> {value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
            <h4 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
              <AwardIcon className="w-5 h-5 text-blue-700" /> Special Opportunities
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                ['Journal Publication:', 'Selected papers invited for journal publication'],
                ['Best Paper Award:', 'Announced during the conference'],
                ['Best Presentation:', 'Award for outstanding presentations'],
                ['Research Collaboration:', 'Networking opportunities with experts'],
                ['Future Opportunities:', 'Access to research partnerships'],
              ].map(([label, value]) => (
                <li key={label} className="flex items-start gap-2.5">
                  <span className="text-blue-700 font-semibold mt-0.5">•</span>
                  <span><strong className="text-slate-900 font-medium">{label}</strong> {value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Benefits */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 mb-6">
          <h4 className="text-base font-semibold text-slate-900 mb-6">Benefits of Publishing with Us</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: BookIcon, title: 'Wide Visibility', desc: 'Your research reaches a global audience through our digital platform' },
              { icon: ShieldCheckIcon, title: 'Quality Assurance', desc: 'Rigorous peer review ensures high-quality publications' },
              { icon: AwardIcon, title: 'Academic Credibility', desc: 'ISBN-registered proceedings enhance your academic profile' },
              { icon: BookIcon, title: 'Networking', desc: 'Connect with leading researchers and industry experts' },
            ].map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div key={idx} className="flex gap-3">
                  <Icon className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-slate-900 text-sm">{benefit.title}</h5>
                    <p className="text-sm text-slate-500 mt-0.5">{benefit.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Important Notes */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 bg-amber-50/50 border-amber-100">
          <h4 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-amber-600" /> Important Notes
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            {[
              'At least one author must register and attend the conference to present the paper',
              'Papers not presented cannot be included in the proceedings',
              'All copyright and publication rights must be transferred to the conference',
              'Authors are responsible for the accuracy and originality of their submitted work',
              'Copyright infringement and plagiarism cases will be handled strictly',
            ].map((note) => (
              <li key={note} className="flex items-start gap-2.5">
                <span className="text-amber-600 font-semibold mt-0.5">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
