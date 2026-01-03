import Link from 'next/link'
import { CheckCircleIcon, DocumentIcon } from './Icons'

export default function RegistrationSection() {
  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Registration Instructions</h2>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">How to Register for the Conference</h3>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Create an Account:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Click on the "Create Account" button to create your account with your email address.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Fill Personal Details:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Complete your profile with accurate information including your academic affiliation and contact details.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Choose Registration Type:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Select from Student, Faculty, Research Scholar, or Industry Professional categories.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Payment:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Complete the registration fee payment through our secure payment gateway.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Confirmation:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">You will receive a confirmation email with your registration details and conference schedule.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Important Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-indigo-600">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <DocumentIcon /> Registration Details
            </h4>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircleIcon />
                <span><strong className="text-gray-900 dark:text-white">Early bird registration:</strong> Closes on January 15, 2026</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon />
                <span><strong className="text-gray-900 dark:text-white">Student discounts:</strong> Available with valid ID verification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon />
                <span><strong className="text-gray-900 dark:text-white">Group discounts:</strong> For 5+ participants from same institution</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon />
                <span><strong className="text-gray-900 dark:text-white">Last date:</strong> March 20, 2026</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-purple-600">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <DocumentIcon /> Registration Fees
            </h4>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-medium">
              <li className="flex justify-between items-center">
                <span><strong className="text-gray-900 dark:text-white">Students:</strong></span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">₹500 / $10</span>
              </li>
              <li className="flex justify-between items-center">
                <span><strong className="text-gray-900 dark:text-white">Faculty/Scholars:</strong></span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">₹1000 / $20</span>
              </li>
              <li className="flex justify-between items-center">
                <span><strong className="text-gray-900 dark:text-white">Industry Professionals:</strong></span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">₹1500 / $30</span>
              </li>
              <li className="pt-4 border-t border-gray-300 dark:border-gray-600 flex justify-between items-center">
                <span><strong className="text-gray-900 dark:text-white">Early Bird (All):</strong></span>
                <span className="font-bold text-green-600 dark:text-green-400">20% Discount</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  )
}
