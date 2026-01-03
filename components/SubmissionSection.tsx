import Link from 'next/link'
import { DocumentIcon, CheckCircleIcon, CalendarIcon } from './Icons'

export default function SubmissionSection() {
  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Paper Submission Guidelines</h2>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">How to Submit Your Research Paper</h3>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Prepare Your Paper:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Format your paper according to the conference template (IEEE format). Ensure it meets all technical and formatting requirements.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Login to Portal:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Access the submission system through your registered account on our conference portal.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Upload Documents:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Submit your paper in PDF format along with any supplementary materials, source code, or datasets.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Complete Metadata:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Fill in all required fields including title, abstract, keywords, and author information with affiliations.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Review and Submit:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Carefully review all information before final submission. You cannot edit after submission.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Submission Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-green-600">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <DocumentIcon /> Paper Requirements
            </h4>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircleIcon />
                <span><strong className="text-gray-900 dark:text-white">Full Papers:</strong> Maximum 6 pages</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon />
                <span><strong className="text-gray-900 dark:text-white">Short Papers:</strong> Maximum 4 pages</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon />
                <span><strong className="text-gray-900 dark:text-white">Format:</strong> IEEE template (.doc or .pdf)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon />
                <span><strong className="text-gray-900 dark:text-white">Language:</strong> English only</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon />
                <span><strong className="text-gray-900 dark:text-white">File Size:</strong> Maximum 10 MB</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-blue-600">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <CheckCircleIcon /> Important Rules
            </h4>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Originality:</strong> Papers must be original and not published elsewhere</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Review Process:</strong> Double-blind peer review</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Plagiarism:</strong> Plagiarism check mandatory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Author Information:</strong> Blind submission required</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Deadline:</strong> February 20, 2026 (11:59 PM IST)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-8 mb-8">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <CalendarIcon /> Submission Timeline
          </h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-semibold text-orange-600">Jan 20, 2026</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Submission Portal Opens</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">You can start uploading your papers</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-semibold text-orange-600">Feb 20, 2026</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Submission Deadline</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Final date to submit papers</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-semibold text-orange-600">Mar 1, 2026</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Review Period Ends</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Peer review process completes</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-semibold text-orange-600">Mar 10, 2026</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Acceptance Notification</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Authors notified of acceptance/rejection</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-semibold text-orange-600">Mar 30, 2026</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Camera-Ready Submission</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Final version due with revisions</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            Submit Your Paper
          </Link>
        </div>
      </div>
    </div>
  )
}
