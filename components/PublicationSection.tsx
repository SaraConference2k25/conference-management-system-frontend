import { BookIcon, AwardIcon, ShieldCheckIcon } from './Icons'

export default function PublicationSection() {
  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Publication Information</h2>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">Publication Process</h3>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Peer Review:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">All submitted papers undergo rigorous double-blind peer review by experts in the field. Each paper is reviewed by at least 2-3 reviewers.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Notification:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Authors will be notified of acceptance/rejection status by March 10, 2026, along with detailed reviewer comments.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Camera-Ready Submission:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Accepted papers must be revised according to reviewer comments. Finalized versions must be submitted by March 30, 2026.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Copyright Transfer:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Complete the copyright transfer form provided for final publication and conference proceedings.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
              <div>
                <strong className="text-gray-900 dark:text-white font-semibold">Conference Proceedings:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">Accepted papers will be published in the official conference proceedings with ISBN.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Publication Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-purple-600">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <BookIcon /> Publication Details
            </h4>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Conference Proceedings:</strong> Published with ISBN</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Digital Access:</strong> Online proceedings available to all participants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Print Copies:</strong> Limited print copies available for purchase</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Archive:</strong> Permanent digital archive maintained</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Citation:</strong> Properly indexed for academic citations</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-indigo-600">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <AwardIcon /> Special Opportunities
            </h4>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Journal Publication:</strong> Selected papers invited for journal publication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Best Paper Award:</strong> Announced during the conference</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Best Presentation:</strong> Award for outstanding presentations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Research Collaboration:</strong> Networking opportunities with experts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold mt-0.5">•</span>
                <span><strong className="text-gray-900 dark:text-white">Future Opportunities:</strong> Access to research partnerships</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-indigo-800 rounded-xl p-8 mb-8">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">Benefits of Publishing with Us</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <BookIcon />
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white">Wide Visibility</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Your research reaches a global audience through our digital platform</p>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheckIcon />
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white">Quality Assurance</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Rigorous peer review ensures high-quality publications</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AwardIcon />
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white">Academic Credibility</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">ISBN-registered proceedings enhance your academic profile</p>
              </div>
            </div>
            <div className="flex gap-3">
              <BookIcon />
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white">Networking</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Connect with leading researchers and industry experts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldCheckIcon /> Important Notes
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold mt-0.5">•</span>
              At least one author must register and attend the conference to present the paper
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold mt-0.5">•</span>
              Papers not presented cannot be included in the proceedings
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold mt-0.5">•</span>
              All copyright and publication rights must be transferred to the conference
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold mt-0.5">•</span>
              Authors are responsible for the accuracy and originality of their submitted work
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold mt-0.5">•</span>
              Copyright infringement and plagiarism cases will be handled strictly
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
