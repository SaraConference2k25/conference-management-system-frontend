import Link from 'next/link'
import { CheckCircleIcon, DocumentIcon } from './Icons'

export default function RegistrationSection() {
  const steps = [
    { title: 'Create an Account', desc: 'Click on the "Create Account" button to create your account with your email address.' },
    { title: 'Fill Personal Details', desc: 'Complete your profile with accurate information including your academic affiliation and contact details.' },
    { title: 'Choose Registration Type', desc: 'Select from Student, Faculty, Research Scholar, or Industry Professional categories.' },
    { title: 'Payment', desc: 'Complete the registration fee payment through our secure payment gateway.' },
    { title: 'Confirmation', desc: 'You will receive a confirmation email with your registration details and conference schedule.' },
  ]

  return (
    <div className="w-full py-16 sm:py-20 px-4 sm:px-8 page-enter">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading text-2xl sm:text-3xl mb-8">Registration Instructions</h2>

        <div className="card p-6 sm:p-8 mb-8 bg-blue-50/50 border-blue-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">How to Register for the Conference</h3>
          <ol className="space-y-5">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-700 text-white rounded-md flex items-center justify-center text-xs font-medium">{i + 1}</span>
                <div>
                  <strong className="text-slate-900 font-medium text-sm">{step.title}</strong>
                  <p className="text-slate-600 mt-0.5 text-sm">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6 border-l-[3px] border-l-blue-700">
            <h4 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <DocumentIcon /> Registration Details
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                ['Early bird registration:', 'Closes on January 15, 2026'],
                ['Student discounts:', 'Available with valid ID verification'],
                ['Group discounts:', 'For 5+ participants from same institution'],
                ['Last date:', 'March 20, 2026'],
              ].map(([label, value], i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircleIcon />
                  <span><strong className="text-slate-900 font-medium">{label}</strong> {value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 border-l-[3px] border-l-slate-700">
            <h4 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <DocumentIcon /> Registration Fees
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                ['Students', '₹500 / $10'],
                ['Faculty/Scholars', '₹1000 / $20'],
                ['Industry Professionals', '₹1500 / $30'],
              ].map(([label, price], i) => (
                <li key={i} className="flex justify-between items-center">
                  <span className="font-medium text-slate-900">{label}</span>
                  <span className="font-semibold text-slate-700 tabular-nums">{price}</span>
                </li>
              ))}
              <li className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="font-medium text-slate-900">Early Bird (All)</span>
                <span className="font-semibold text-emerald-700">20% Discount</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/register" className="btn-primary px-8 py-3">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  )
}
